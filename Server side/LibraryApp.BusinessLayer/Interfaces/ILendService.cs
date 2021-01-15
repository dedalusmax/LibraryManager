using LibraryApp.DomainLayer.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Interfaces
{
	public interface ILendService
	{
		Task<Book> Lend(Guid bookId, string lenderCardNumber, CancellationToken cancellationToken);
		Task<Book> Return(Guid bookId, string lenderCardNumber, CancellationToken cancellationToken);
	}
}
