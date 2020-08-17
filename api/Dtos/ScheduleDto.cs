namespace api.Dtos
{
    public class ScheduleDto
    {
        public int WeekDay { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int ClassId { get; set; }
    }
}