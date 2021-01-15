using FluentValidation.Results;
using LibraryApp.BusinessLayer.Exceptions;
using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.BusinessLayer.Validators;
using LibraryApp.DomainLayer.Entities;
using LibraryApp.DomainLayer.Enums;
using LibraryApp.DomainLayer.Helpers;
using LibraryApp.PersistanceLayer.Interfaces;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Implementations
{
	internal class BookService : IBookService
	{
		private readonly IRepository<Book> _repository;
		private readonly ILogger<BookService> _logger;
		private readonly BookValidator _validator = new BookValidator();

		public BookService(IRepository<Book> repository, ILogger<BookService> logger)
		{
			_repository = repository;
			_logger = logger;
		}

		public async Task<Book> Create(Book book, CancellationToken cancellationToken)
		{
			ValidationResult result = _validator.Validate(book);

			if(!result.IsValid)
			{
				ValidationException exception = new ValidationException(nameof(book));
				foreach (ValidationFailure failure in result.Errors)
				{
					exception._errors.Add(failure.PropertyName, failure.ErrorMessage);
				}

				throw exception;
			}

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
				_logger.LogInformation($"Book succesfully deleted. Book id: {id}");
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

			_logger.LogInformation($"Book succesfully fetched. Book id: {id}");
			return book;
		}

		public async Task<PagedList<Book>> GetAll(Parameters bookParameters, CancellationToken cancellationToken)
		{
			var books = await _repository.GetAll(
				include: source => source.Include(x => x.Lender),
				filter: GetFilter(bookParameters.SearchString),
				orderBy: GetSort(bookParameters.OrderBy, bookParameters.SortDirection),
				cancellationToken: cancellationToken);

			return PagedList<Book>.ToPagedList(books, bookParameters.PageNumber, bookParameters.PageSize);
		}

		public async Task<Book> Update(Book book, CancellationToken cancellationToken)
		{
			ValidationResult result = _validator.Validate(book);

			if (!result.IsValid)
			{
				ValidationException exception = new ValidationException(nameof(book));
				foreach (ValidationFailure failure in result.Errors)
				{
					exception._errors.Add(failure.PropertyName, failure.ErrorMessage);
				}

				throw exception;
			}

			try
			{
				await _repository.Update(book, cancellationToken);
				_logger.LogInformation($"Book succesfully updated. Book id: {book.Id}");
				return book;
			}
			catch(Exception e)
			{
				throw new UpdateException(book.Id, e);
			}
			
		}

		internal Expression<Func<Book, bool>> GetFilter(string searchString)
		{
			if (string.IsNullOrWhiteSpace(searchString))
				return null;

			var query = searchString.Trim().ToLower();

			var predicate = PredicateBuilder.New<Book>();
			predicate.Or(book => book.Title.ToLower().Contains(query));
			predicate.Or(book => book.Author.ToLower().Contains(query));
			predicate.Or(book => book.Publisher.ToLower().Contains(query));
			
			return predicate;
		}

		internal Func<IQueryable<Book>, IQueryable<Book>> GetSort(string orderBy, SortDirection? sortDirection)
		{
			if (sortDirection == null)
				return null;

			if (string.IsNullOrWhiteSpace(orderBy))
				return null;

			return books =>
			{
				switch (orderBy)
				{
					case "author":
						if (sortDirection == SortDirection.asc)
						{
							books = books.OrderBy(x => x.Author);
						}
						else
						{
							books = books.OrderByDescending(x => x.Author);
						}
						break;

					case "title":
						if (sortDirection == SortDirection.asc)
						{
							books = books.OrderBy(x => x.Title);
						}
						else
						{
							books = books.OrderByDescending(x => x.Title);
						}
						break;

					case "street":
						if (sortDirection == SortDirection.asc)
						{
							books = books.OrderBy(x => x.Publisher);
						}
						else
						{
							books = books.OrderByDescending(x => x.Publisher);
						}
						break;
				}

				return books;
			};
		}
	}
}
