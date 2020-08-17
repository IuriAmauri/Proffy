using System.Collections.Generic;
using api.Entities;

namespace api.Database.Interfaces
{
    public interface IUserRepository
    {
         bool SaveChanges();
         IEnumerable<User> GetAllUsers();
         User GetUserById(int id);
         User CreateUser(User user);
    }
}