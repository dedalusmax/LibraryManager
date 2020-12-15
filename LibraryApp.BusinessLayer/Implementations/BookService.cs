using LibraryApp.BusinessLayer.Exceptions;
using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.DomainLayer.Entities;
using LibraryApp.PersistanceLayer.Interfaces;
using Microsoft.Extensions.Logging;
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
		private readonly ILogger<BookService> _logger;

		public BookService(IRepository<Book> repository, ILogger<BookService> logger)
		{
			_repository = repository;
			_logger = logger;
		}

		public async Task<Book> Create(Book book, CancellationToken cancellationToken)
		{
			try
			{
				await _repository.Insert(book, cancellationToken);
				_logger.LogInformation($"Book succesfully inserted. Book id: {book.Id}");
				return book;
			}
			catch (Exception e)
			{
				throw new CreateException(e);
			}
			
		}

		public async Task<Guid> Delete(Guid id, CancellationToken cancellationToken)
		{
			try
			{
				await _repository.Delete(id, cancellationToken);
				return id;
			}
			catch(Exception e)
			{
				throw new DeleteException(id, e);
			}
			
		}

		public async Task<Book> Get(Guid id, CancellationToken cancellationToken)
		{

			var book = await _repository.Get(
				filter: dbBook => dbBook.Id == id,
				cancellationToken: cancellationToken);

			if(book == null)
			{
				throw new NotFoundException(id);
			}

			return book;
		}

		public async Task<IEnumerable<Book>> GetAll(CancellationToken cancellationToken)
		{
			var books = await _repository.GetAll(cancellationToken: cancellationToken);

			return books;
		}

		public async Task<Book> Update(Book book, CancellationToken cancellationToken)
		{
			try
			{
				await _repository.Update(book, cancellationToken);
				return book;
			}
			catch(Exception e)
			{
				throw new UpdateException(book.Id, e);
			}
			
		}
	}
}
