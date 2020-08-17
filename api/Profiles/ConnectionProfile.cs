using api.Dtos;
using api.Entities;
using AutoMapper;

namespace api.Profiles
{
    public class ConnectionProfile : Profile
    {
        public ConnectionProfile()
        {
            CreateMap<Connection, ConnectionDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Class, ClassDto>().ReverseMap();
            CreateMap<Schedule, ScheduleDto>().ReverseMap();
        }
    }
}