using LibraryApp.DomainLayer.Entities;
using LibraryApp.DomainLayer.Helpers;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Interfaces
{
	public interface IBookService
	{
		Task<PagedList<Book>> GetAll(Parameters bookParameters, CancellationToken cancellationToken);
		Task<Book> Get(Guid id, CancellationToken cancellationToken);
		Task<Book> Create(Book book, CancellationToken cancellationToken);
		Task<Book> Update(Book book, CancellationToken cancellationToken);
		Task<Guid> Delete(Guid id, CancellationToken cancellationToken);
	}
}
