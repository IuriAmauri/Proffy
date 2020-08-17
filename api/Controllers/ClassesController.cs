using System.Collections.Generic;
using api.Database.Interfaces;
using api.Dtos;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("/classes")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly IClassRepository _classRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public ClassesController(
            IClassRepository classRepository,
            IUserRepository userRepository,
            IMapper mapper)
        {
            _classRepository = classRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Class>> GetAllClasses()
        {
            var classes = new List<ClassReadDto>();

            foreach (var item in _classRepository.GetAllClasses())
            {
                var user = _userRepository.GetUserById(item.UserId);

                var classInfo = new ClassReadDto {
                    Name = user.Name,
                    AvatarUrl = user.AvatarUrl,
                    Bio = user.Bio,
                    WhatsApp = user.WhatsApp,
                    Subject = item.Subject,
                    Cost = item.Cost
                };

                classes.Add(classInfo);
            }

            return Ok(classes);
        }

        [HttpGet("/{id}")]
        public ActionResult<Class> GetClassById(int id)
        {
            return _classRepository.GetClassById(id);
        }

        [HttpPost]
        public ActionResult<Class> CreateClass(ClassDto classCreateDto)
        {
            if (classCreateDto == null)
                return BadRequest(nameof(classCreateDto));

            _classRepository.CreateClass(_mapper.Map<Class>(classCreateDto));
            _classRepository.SaveChanges();

            return Created("", classCreateDto);
        }
    }
}