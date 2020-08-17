using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class Class
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal Cost { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public List<Schedule> Schedules { get; set; }
    }
}