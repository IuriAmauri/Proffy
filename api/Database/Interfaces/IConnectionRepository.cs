using api.Entities;

namespace api.Database.Interfaces
{
    public interface IConnectionRepository
    {
        bool SaveChanges();
        int GetConnections();
        Connection CreateConnection(Connection connection);
    }
}