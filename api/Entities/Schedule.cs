namespace api.Entities
{
    public class Schedule
    {
        public int Id { get; set; }
        public int WeekDay { get; set; }
        public string From { get; set; }
        public string To { get; set; }

        public int ClassId { get; set; }
        public Class Class { get; set; }
    }
}