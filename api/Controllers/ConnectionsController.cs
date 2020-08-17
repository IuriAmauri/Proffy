using System;
using api.Database.Interfaces;
using api.Dtos;
using api.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("/connections")]
    [ApiController]
    public class ConnectionsController : ControllerBase
    {
        private readonly IConnectionRepository _connectionsRepository;
        private readonly IMapper _mapper;
        public ConnectionsController(IConnectionRepository connectionsRepository, IMapper mapper)
        {
            _connectionsRepository = connectionsRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<int> Get()
        {
            return Ok(_connectionsRepository.GetConnections());
        }

        [HttpPost]
        public ActionResult<Connection> CreateConnection(ConnectionDto connectionCreateDto)
        {
            if (connectionCreateDto == null)
                throw new ArgumentException(nameof(connectionCreateDto));

            _connectionsRepository.CreateConnection(_mapper.Map<Connection>(connectionCreateDto));
            _connectionsRepository.SaveChanges();

            return Created("", connectionCreateDto);
        }
    }
}