using LibraryApp.BusinessLayer.Implementations;
using LibraryApp.BusinessLayer.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.BusinessLayer
{
	public static class ServiceCollectionExtension
	{
		public static void RegisterBussinessServices(this IServiceCollection services)
		{
			services.AddScoped<IBookService, BookService>();
			services.AddScoped<ILendService, LendService>();
		}
	}
}
