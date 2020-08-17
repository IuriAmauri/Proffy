namespace api.Entities
{
    public class Class
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public decimal Cost { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}