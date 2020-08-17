using System.Collections.Generic;
using api.Entities;

namespace api.Database.Interfaces
{
    public interface IScheduleRepository
    {
        bool SaveChanges();
        IEnumerable<Schedule> GetAllSchedules();
        IEnumerable<Schedule> GetScheduleByClassId(int classId);
        Schedule CreateSchedule(Schedule scheduleCreate);
    }
}