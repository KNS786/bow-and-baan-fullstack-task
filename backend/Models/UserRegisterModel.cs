

namespace backend.Models
{
    public class UserRegister {
        public int Id {get; set;}
        public string FirstName { get; set;}
        public string LastName { get; set;}
        public string Email { get; set;}
        public string Password { get; set;}
        public DateTime DOB { get; set;} 
    }
}

