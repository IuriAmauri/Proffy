using System.Collections.Generic;
using System.Linq;
using api.Database.Interfaces;
using api.Entities;

namespace api.Database
{
    public class ScheduleRepository : IScheduleRepository
    {
        private readonly ProffyDbContext _dbContext;
        public ScheduleRepository(ProffyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool SaveChanges()
        {
            return _dbContext.SaveChanges() > 0;
        }

        public IEnumerable<Schedule> GetAllSchedules()
        {
            return _dbContext.Schedules.ToList();
        }

        public IEnumerable<Schedule> GetScheduleByClassId(int classId)
        {
            return _dbContext.Schedules.Where(w => w.ClassId == classId).ToList();
        }

        public Schedule CreateSchedule(Schedule schedule)
        {
            return _dbContext.Schedules.Add(schedule).Entity;
        }
    }
}