using System.Collections.Generic;
using api.Database.Interfaces;
using api.Dtos;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("/schedules")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly IScheduleRepository _scheduleRepository;
        private readonly IMapper _mapper;
        public SchedulesController(IScheduleRepository scheduleRepository, IMapper mapper)
        {
            _scheduleRepository = scheduleRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Schedule>> GetAllSchedules()
        {
            return Ok(_scheduleRepository.GetAllSchedules());
        }

        [HttpGet("/{classId}")]
        public ActionResult<IEnumerable<Schedule>> GetScheduleByClassId(int classId)
        {
            return Ok(_scheduleRepository.GetScheduleByClassId(classId));
        }

        [HttpPost]
        public ActionResult<Schedule> CreateSchedule(IEnumerable<ScheduleDto> schedulesCreateDto)
        {
            if (schedulesCreateDto == null)
                return BadRequest(nameof(schedulesCreateDto));
            
            foreach (var schedule in schedulesCreateDto)
            {
                _scheduleRepository.CreateSchedule(_mapper.Map<Schedule>(schedule));                                
            }

            _scheduleRepository.SaveChanges();

            return Created("", schedulesCreateDto);
        }
    }
}