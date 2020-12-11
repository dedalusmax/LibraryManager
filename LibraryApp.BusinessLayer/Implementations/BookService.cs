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
	internal class BookService : IBookService
	{
		private readonly IRepository<Book> _repository;

		public BookService(IRepository<Book> repository)
		{
			_repository = repository;
		}

		public async Task<Book> Create(Book book, CancellationToken cancellationToken)
		{
			
			await _repository.Insert(book, cancellationToken);
			return book;
		}

		public async Task<Guid> Delete(Guid id, CancellationToken cancellationToken)
		{
			await _repository.Delete(id, cancellationToken);
			return id;
		}

		public async Task<Book> Get(Guid id, CancellationToken cancellationToken)
		{
			var book = await _repository.Get(
				filter: dbBook => dbBook.Id == id,
				cancellationToken: cancellationToken);

			return book;
		}

		public async Task<IEnumerable<Book>> GetAll(CancellationToken cancellationToken)
		{
			var books = await _repository.GetAll(cancellationToken: cancellationToken);

			return books;
		}

		public async Task<Book> Update(Book book, CancellationToken cancellationToken)
		{
			await _repository.Update(book, cancellationToken);
			return book;
		}
	}
}
