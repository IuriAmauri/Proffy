using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace api.Entities
{
    public class User : IdentityUser<long>
    {
        public string Name { get; set; }
        public string AvatarUrl { get; set; }
        public string WhatsApp  { get; set; }
        public string Bio { get; set; }
        public string Password { get; set; }
        public List<UserRole> UserRoles { get; set; }
    }
}