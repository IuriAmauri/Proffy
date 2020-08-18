using System.Collections.Generic;

namespace api.Dtos
{
    public class ClassCreateDto
    {
        public string Name { get; set; }
        public string AvatarUrl { get; set; }
        public string WhatsApp  { get; set; }
        public string Bio { get; set; }
        
        public string Subject { get; set; }
        public decimal Cost { get; set; }

        public IEnumerable<ScheduleCreateDto> Schedule { get; set; }
    }
}