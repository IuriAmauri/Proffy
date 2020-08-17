using System.Linq;
using api.Database.Interfaces;
using api.Entities;

namespace api.Database
{
    public class ConnectionRepository : IConnectionRepository
    {
        private readonly ProffyDbContext _dbContext;
        public ConnectionRepository(ProffyDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public bool SaveChanges()
        {
            return _dbContext.SaveChanges() > 0;
        }

        public int GetConnections()
        {
            return _dbContext.Connections.Count();
        }

        public Connection CreateConnection(Connection connection)
        {
            return _dbContext.Connections.Add(connection).Entity;
        }
    }
}