using System;

namespace api.Entities
{
    public class Connection
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}