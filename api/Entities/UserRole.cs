using Microsoft.AspNetCore.Identity;

namespace api.Entities
{
    public class UserRole : IdentityUserRole<long>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}