using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Implementations
{
	internal class LendService : ILendService
	{
		private readonly IBookService _bookService;
		private readonly ICustomerService _customerService;

		public LendService(IBookService bookService, ICustomerService customerService)
		{
			_bookService = bookService;
			_customerService = customerService;
		}

		public async Task<Book> Lend(Guid id, string lenderCardNumber, CancellationToken cancellationToken)
		{
			var book = await _bookService.Get(id, cancellationToken);
			var lender = await _customerService.GetByCardNumber(lenderCardNumber, cancellationToken);


			if (lender.LendedBooks == null)
			{
				lender.LendedBooks = new List<Book>();
				lender.LendedBooks.Add(book);
			}else
			{
				lender.LendedBooks.Add(book);
			}
			
			book.IsLended = true;
			book.Lender = lender;

			await _bookService.Update(book, cancellationToken);
			await _customerService.Update(lender, cancellationToken);

			return book;
		}

		public async Task<Book> Return(Guid id, string lenderCardNumber, CancellationToken cancellationToken)
		{
			var book = await _bookService.Get(id, cancellationToken);
			var lender = await _customerService.GetByCardNumber(lenderCardNumber, cancellationToken);

			var bookToRemove = lender.LendedBooks.FirstOrDefault(b => b.Id == id);
			lender.LendedBooks.Remove(bookToRemove);
			
			book.IsLended = false;
			book.LenderId = null;
			book.Lender = null;

			await _bookService.Update(book, cancellationToken);
			await _customerService.Update(lender, cancellationToken);

			return book;
		}
	}
}
