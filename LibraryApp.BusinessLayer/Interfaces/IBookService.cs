using LibraryApp.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Interfaces
{
	public interface IBookService
	{
		Task<IEnumerable<Book>> GetAll(CancellationToken cancellationToken);
		Task<Book> Get(Guid id, CancellationToken cancellationToken);
		Task<Book> Create(Book book, CancellationToken cancellationToken);
		Task<Book> Update(Book book, CancellationToken cancellationToken);
		Task<Guid> Delete(Guid id, CancellationToken cancellationToken);
	}
}
