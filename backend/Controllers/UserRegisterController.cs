using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserRegisterController: ControllerBase
{
    private readonly UserRegisterContext _context;

    public UserRegisterController(UserRegisterContext context)
    {
        _context = context;
    }


    //check is Empty
    public bool isEmpty( string value){
        if(string.IsNullOrWhiteSpace(value)){
            return true;
        }
        return false;
    }

    //chars range of the word
    public bool isNotValidLength(string word){
        if(string.IsNullOrWhiteSpace(word) || word.Length < 5 || word.Length > 50){
            return true;
        }
        return false;
    }

    //validate email
    public bool isValidEmail(string email){
        var emailAttribute = new EmailAddressAttribute();
        return emailAttribute.IsValid(email);
    }

    public bool IsValidDate(string date){
        return DateTime.TryParse(date, out _);
    }

    public bool isMinor(string dob){
        string[] dateSplitter = dob.Split("-");
        int year = Int32.Parse(dateSplitter[0]);
        int month = Int32.Parse(dateSplitter[1]);
        int date = Int32.Parse(dateSplitter[2]);
        DateTime dateOfBirth = new DateTime(year,month,date);
        DateTime currentDate = DateTime.Now;

        int age = currentDate.Year - dateOfBirth.Year;

        //adjust for birthdate not yet reached this year
        if(dateOfBirth.Date > DateTime.Now.AddYears(-age)){
            age--;
        }
        return age < 18;

    }

    

    [HttpPost("register")]
    public IActionResult RegisterUser([FromBody] UserRegister user){

        if(user == null){
            return BadRequest("Invalid  user data.");
        }

        if(_context.user.Any(u => u.Email == user.Email))
        {
            return BadRequest("Email Already Exists");
        }


        // validate user first name
        if(isEmpty(user.FirstName)){
            return BadRequest("First name is required");
        }

        // min length 5 to max length 50 chars allowed
        if(isNotValidLength(user.FirstName)){
            return BadRequest("First name must be between 5 and 50 characters.");
        }

        //validate last name
        if(isEmpty(user.LastName)){
            return BadRequest("Last name is required");
        }

        if(isNotValidLength(user.LastName)){
            return BadRequest("Last name must be between 5 and 50 characters.");
        }

        //email
        if(!isValidEmail(user.Email)){
            return BadRequest("Invalid Email address");
        }

        //password must be minium 8 chars
        if(string.IsNullOrWhiteSpace(user.Password) || user.Password.Trim().Length < 8){
            return BadRequest("Password must be at least 8 characters long");
        }

        //date
        if(!IsValidDate(user.DOB.ToString("yyyy-MM-dd"))){
            return BadRequest("Invalid Date. Date should be yyyy-MM-dd.");
        }

        //validate user must be greater than 18 
        
        if(isMinor(user.DOB.ToString("yyyy-MM-dd"))){
            return BadRequest("Invalid Date Of Birth. allowed 18+");
        }

        //for unique user id
        Random rnd = new Random();
        user.Id = rnd.Next(100,100000);

        _context.user.Add(user);
        _context.SaveChanges();

        return Ok("User registered successfully");
    }

    [HttpGet("GetUsers")]
    public async Task<ActionResult<List<UserRegister>>> Get(){
        var List = await _context.user.Select(
            s =>  new UserRegister{
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Email = s.Email,
                Password = s.Password,
                DOB = s.DOB,
            }
        ).ToListAsync();

        if(List.Count < 0){
            return NotFound();
        }
        else{
            return List;
        }
    }
}