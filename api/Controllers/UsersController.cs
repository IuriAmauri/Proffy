using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Database.Interfaces;
using api.Dtos;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
        [HttpPost("register")]
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

        
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLogin)
        {
            var user = await _userManager.FindByNameAsync(userLogin.UserName);
            var result = await _signInManager.CheckPasswordSignInAsync(user, userLogin.Password, false);

            if (result.Succeeded)
            {
                var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedUserName == userLogin.UserName.ToUpper());

                var token = GenerateToken(appUser).Result;

                return Ok(new {
                    token = token,
                    user = _mapper.Map<UserLoginDto>(appUser)
                });
            }

            return Unauthorized();
        }

        private async Task<string> GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            foreach (var role in await _userManager.GetRolesAsync(user))
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("Super Secret Key"));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        }
    }
}