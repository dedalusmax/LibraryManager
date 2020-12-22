using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.DomainLayer.Entities;
using LibraryApp.PersistanceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Implementations
{
	internal class LendService : ILendService
	{
		private readonly IBookService _bookService;

		public LendService(IBookService bookService)
		{
			_bookService = bookService;
		}

		public async Task<Book> Lend(Guid id, CancellationToken cancellationToken)
		{
			var book = await _bookService.Get(id, cancellationToken);

			book.IsLended = true;

			await _bookService.Update(book, cancellationToken);

			return book;
		}

		public async Task<Book> Return(Guid id, CancellationToken cancellationToken)
		{
			var book = await _bookService.Get(id, cancellationToken);

			book.IsLended = false;

			await _bookService.Update(book, cancellationToken);

			return book;
		}
	}
}
