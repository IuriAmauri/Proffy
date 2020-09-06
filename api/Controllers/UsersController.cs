using System.Collections.Generic;
using api.Database.Interfaces;
using api.Dtos;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IUserRepository _userRepository;

        public UsersController(
            IUserRepository userRepository, 
            IMapper mapper,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
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

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<User> CreateUser(UserDto userCreateDto)
        {
            if (userCreateDto == null)
                return BadRequest(nameof(userCreateDto));

            var user = _mapper.Map<User>(userCreateDto);
            var result = _userManager.CreateAsync(user, user.Password).Result;

            if (result.Succeeded)
            {
                var userToReturn = _mapper.Map<UserReadDto>(user);
                return Created("", userToReturn);
            }

            return BadRequest($"Erro ao criar usuário {result.Errors.ToString()}");
        }
    }
}