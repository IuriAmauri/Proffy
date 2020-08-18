namespace api.Entities
{
    public class Schedule
    {
        public int Id { get; set; }
        public int WeekDay { get; set; }
        public int From { get; set; }
        public int To { get; set; }

        public int ClassId { get; set; }
        public Class Class { get; set; }
    }
}