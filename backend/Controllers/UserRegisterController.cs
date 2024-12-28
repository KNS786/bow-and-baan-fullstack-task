using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

    [HttpPost("register")]
    public IActionResult RegisterUser([FromBody] UserRegister user){
        Console.WriteLine("Standard Numeric Format Specifiers" + user);
        if(user == null){
            return BadRequest("Invalid  user data.");
        }

        if(_context.user.Any(u => u.Email == user.Email))
        {
            return BadRequest("Email Already Exists");
        }

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
                DOB = s.DOB
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