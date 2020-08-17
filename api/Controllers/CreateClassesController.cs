using System.Collections.Generic;
using System.Transactions;
using api.Database.Interfaces;
using api.Dtos;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("/createclasses")]
    [ApiController]
    public class CreateClassesController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IClassRepository _classRepository;
        private readonly IScheduleRepository _scheduleRepository;
        private readonly IMapper _mapper;

        public CreateClassesController(
            IUserRepository userRepository,
            IClassRepository classRepository,
            IScheduleRepository scheduleRepository,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _classRepository = classRepository;
            _scheduleRepository = scheduleRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public ActionResult CreateClass(ClassCreateDto createClassDto)
        {
            using (var transacao = new CommittableTransaction())
            {
                var userDto = new UserDto {
                    Name = createClassDto.Name,
                    AvatarUrl = createClassDto.AvatarUrl,
                    WhatsApp = createClassDto.WhatsApp,
                    Bio = createClassDto.Bio
                };

                var user = _userRepository.CreateUser(_mapper.Map<User>(userDto));
                _userRepository.SaveChanges();

                var classDto = new ClassDto {
                    Subject = createClassDto.Subject,
                    Cost = createClassDto.Cost,
                    UserId = user.Id
                };
                
                var classs = _classRepository.CreateClass(_mapper.Map<Class>(classDto));
                _classRepository.SaveChanges();

                foreach (var item in createClassDto.Schedule)
                {
                    var scheduleDto = new ScheduleDto {
                        WeekDay = item.WeekDay,
                        From = item.From,
                        To = item.To,
                        ClassId = classs.Id
                    };

                    _scheduleRepository.CreateSchedule(_mapper.Map<Schedule>(scheduleDto));
                    _scheduleRepository.SaveChanges();
                }

                transacao.Commit();
            }

            return Created("", createClassDto);
        }
    }
}