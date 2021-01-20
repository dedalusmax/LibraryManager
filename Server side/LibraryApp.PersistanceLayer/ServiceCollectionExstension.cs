using LibraryApp.DomainLayer;
using LibraryApp.PersistanceLayer.Interfaces;
using LibraryApp.PersistanceLayer.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.PersistanceLayer
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigurePersistanceLayer(this IServiceCollection services, IConfiguration configuration)
        {
            // Add database
            services.AddDbContext<ApplicationDbContext>(o =>
            {
                o.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
                o.EnableSensitiveDataLogging();
                o.EnableDetailedErrors();
            });

            // Configure context for DI
            services.AddScoped<ApplicationDbContext>();

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        }
    }
}
