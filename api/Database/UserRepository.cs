using System.Collections.Generic;
using System.Linq;
using api.Database.Interfaces;
using api.Entities;

namespace api.Database
{
    public class UserRepository : IUserRepository
    {
        private readonly ProffyDbContext _dbContext;

        public UserRepository(ProffyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _dbContext.Users.ToList();
        }

        public User GetUserById(int id)
        {
            return _dbContext.Users.FirstOrDefault(f => f.Id == id);
        }

        public User CreateUser(User user)
        {
            return _dbContext.Users.Add(user).Entity;
        }

        public bool SaveChanges()
        {
            return _dbContext.SaveChanges() > 0;
        }
    }
}