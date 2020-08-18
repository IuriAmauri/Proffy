namespace api.Dtos
{
    public class ScheduleCreateDto
    {
        public int WeekDay { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int ClassId { get; set; }
    }
}