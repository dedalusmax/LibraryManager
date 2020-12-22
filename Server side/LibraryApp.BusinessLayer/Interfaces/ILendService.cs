using LibraryApp.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Interfaces
{
	public interface ILendService
	{
		Task<Book> Lend(Guid id, CancellationToken cancellationToken);
		Task<Book> Return(Guid id, CancellationToken cancellationToken);
	}
}
