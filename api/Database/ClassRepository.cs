using System;
using System.Collections.Generic;
using System.Linq;
using api.Database.Interfaces;
using api.Dtos;
using api.Entities;
using api.Utils;
using Microsoft.EntityFrameworkCore;

namespace api.Database
{
    public class ClassRepository : IClassRepository
    {
        private readonly ProffyDbContext _dbContext;
        public ClassRepository(ProffyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Class> GetAllClasses(FiltersDto filters)
        {
            IQueryable<Class> query = _dbContext.Classes.Include(c => c.Schedules);

            if (filters.Subject != string.Empty)
                query = query.Where(w => w.Subject == filters.Subject);

            if (filters.WeekDay != string.Empty)
                query = query.Where(w => w.Schedules.Any(e => e.ClassId == w.Id && e.WeekDay == Convert.ToInt32(filters.WeekDay)));

            if (filters.Time != string.Empty)
            {
                var minutes = new StringToMinutesConversor().Convert(filters.Time);
                query = query.Where(w => w.Schedules.Any(e => e.ClassId == w.Id && e.From <= minutes));
            }

            return query.ToList();
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