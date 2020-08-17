using System.Collections.Generic;
using api.Dtos;
using api.Entities;

namespace api.Database.Interfaces
{
    public interface IClassRepository
    {
         bool SaveChanges();
         IEnumerable<Class> GetAllClasses(FiltersDto filters);
         Class GetClassById(int id);
         Class CreateClass(Class classCreate);
    }
}