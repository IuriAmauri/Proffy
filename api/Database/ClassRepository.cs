using System.Collections.Generic;
using System.Linq;
using api.Database.Interfaces;
using api.Dtos;
using api.Entities;

namespace api.Database
{
    public class ClassRepository : IClassRepository
    {
        private readonly ProffyDbContext _dbContext;
        public ClassRepository(ProffyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Class> GetAllClasses()
        {
            return _dbContext.Classes.ToList();
        }

        public Class GetClassById(int id)
        {
            return _dbContext.Classes.FirstOrDefault(f => f.Id == id);
        }

        public Class CreateClass(Class classCreate)
        {
            return _dbContext.Classes.Add(classCreate).Entity;
        }

        public bool SaveChanges()
        {
            return _dbContext.SaveChanges() > 0;
        }
    }
}