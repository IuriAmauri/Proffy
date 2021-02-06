using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace api.Database
{
    public static class ProffyPrepRepository
    {
        public static void PrepPopulation(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<ProffyDbContext>());
            }
        }

        public static void SeedData(ProffyDbContext proffyContext)
        {
            System.Console.WriteLine("Applying Migrations...");
            proffyContext.Database.Migrate();
            System.Console.WriteLine("Finished applying migrations...");
            proffyContext.SaveChanges();
        }    
    }
}