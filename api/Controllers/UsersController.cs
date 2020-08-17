using System.Collections.Generic;
using api.Database.Interfaces;
using api.Dtos;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAllUsers()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        [HttpGet("/{id}")]
        public ActionResult<User> GetUserById(int id)
        {
            return Ok(_userRepository.GetUserById(id));
        }

        [HttpPost]
        public ActionResult<User> CreateUser(UserDto userCreateDto)
        {
            if (userCreateDto == null)
                return BadRequest(nameof(userCreateDto));

            _userRepository.CreateUser(_mapper.Map<User>(userCreateDto));
            _userRepository.SaveChanges();

            return Created("", userCreateDto);
        }
    }
}