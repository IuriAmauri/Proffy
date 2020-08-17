using System.Collections.Generic;

namespace api.Dtos
{
    public class ClassReadDto
    {
        public string Name { get; set; }
        public string AvatarUrl { get; set; }
        public string WhatsApp  { get; set; }
        public string Bio { get; set; }
        
        public string Subject { get; set; }
        public decimal Cost { get; set; }

        public IEnumerable<ScheduleDto> Schedule { get; set; }
    }
}