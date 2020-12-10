using LibraryApp.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Interfaces
{
	public interface IBookService
	{
		Task<IEnumerable<Book>> GetAll();
		Task<Book> Get(Guid id);
		Task<Book> Create(Book book);
		Task Update(Book book);
		Task Delete(Guid id);
	}
}
