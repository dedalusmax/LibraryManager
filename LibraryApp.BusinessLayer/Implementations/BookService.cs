using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Implementations
{
	internal class BookService : IBookService
	{
		public Task<Book> Create(Book book)
		{
			throw new NotImplementedException($"Creating ");
		}

		public Task Delete(Guid id)
		{
			throw new NotImplementedException($"Deleting {id}");
		}

		public Task<Book> Get(Guid id)
		{
			throw new NotImplementedException($"Getting {id}");
		}

		public Task<IEnumerable<Book>> GetAll()
		{
			throw new NotImplementedException("Getting all");
		}

		public Task Update(Book book)
		{
			throw new NotImplementedException($"Updating {book.Id}");
		}
	}
}
