using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Database
{
    public class ProffyDbContext : DbContext
    {
        
        public ProffyDbContext(DbContextOptions<ProffyDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
    }
}