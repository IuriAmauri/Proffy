namespace api.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AvatarUrl { get; set; }
        public string WhatsApp  { get; set; }
        public string Bio { get; set; }
        public string Email { get; set; }
        
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}