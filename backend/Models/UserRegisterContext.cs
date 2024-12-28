using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    public class UserRegisterContext: DbContext
    {
        public UserRegisterContext(DbContextOptions<UserRegisterContext> options): base(options){}
        public DbSet<UserRegister> user {get; set;}

    }
}