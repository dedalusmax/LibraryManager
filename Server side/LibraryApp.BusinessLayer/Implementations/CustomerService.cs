using FluentValidation.Results;
using LibraryApp.BusinessLayer.Exceptions;
using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.BusinessLayer.Validators;
using LibraryApp.DomainLayer.Entities;
using LibraryApp.DomainLayer.Enums;
using LibraryApp.DomainLayer.Helpers;
using LibraryApp.PersistanceLayer.Interfaces;
using LinqKit;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ValidationException = LibraryApp.BusinessLayer.Exceptions.ValidationException;
using ValidationResult = FluentValidation.Results.ValidationResult;

namespace LibraryApp.BusinessLayer.Implementations
{
	internal class CustomerService : ICustomerService
	{
		private readonly IRepository<Customer> _repository;
		private readonly ILogger<CustomerService> _logger;
		private readonly CustomerValidator _validator = new CustomerValidator();

		public CustomerService(IRepository<Customer> repository, ILogger<CustomerService> logger)
		{
			_repository = repository;
			_logger = logger;
		}

		public async Task<Customer> Create(Customer customer, CancellationToken cancellationToken)
		{
			ValidationResult result = _validator.Validate(customer);

			if (!result.IsValid)
			{
				ValidationException exception = new ValidationException(nameof(customer));
				foreach (ValidationFailure failure in result.Errors)
				{
					exception._errors.Add(failure.PropertyName, failure.ErrorMessage);
				}

				throw exception;
			}

			try
			{
				await _repository.Insert(customer, cancellationToken);
				_logger.LogInformation($"Customer succesfully inserted. Customer id: {customer.Id}");
				return customer;
			}
			catch (Exception e)
			{
				throw new CreateException(e);
			}

		}

		public Task<Customer> Create(Book customer, CancellationToken cancellationToken)
		{
			throw new NotImplementedException();
		}

		public async Task<Guid> Delete(Guid id, CancellationToken cancellationToken)
		{
			try
			{
				await _repository.Delete(id, cancellationToken);
				_logger.LogInformation($"Customer succesfully deleted. Customer id: {id}");
				return id;
			}
			catch (Exception e)
			{
				throw new DeleteException(id, e);
			}

		}

		public async Task<Customer> Get(Guid id, CancellationToken cancellationToken)
		{

			var customer = await _repository.Get(
				filter: dbCustomer => dbCustomer.Id == id,
				cancellationToken: cancellationToken);

			if (customer == null)
			{
				throw new NotFoundException(id);
			}

			_logger.LogInformation($"Customer succesfully fetched. Customer id: {id}");
			return customer;
		}

		public async Task<PagedList<Customer>> GetAll(Parameters customerParameters, CancellationToken cancellationToken)
		{
			var customers = await _repository.GetAll(
				filter: GetFilter(customerParameters.SearchString),
				orderBy: GetSort(customerParameters.OrderBy, customerParameters.SortDirection),
				cancellationToken: cancellationToken);

			return PagedList<Customer>.ToPagedList(customers, customerParameters.PageNumber, customerParameters.PageSize);
		}

		public async Task<Customer> Update(Customer customer, CancellationToken cancellationToken)
		{
			ValidationResult result = _validator.Validate(customer);

			if (!result.IsValid)
			{
				ValidationException exception = new ValidationException(nameof(customer));
				foreach (ValidationFailure failure in result.Errors)
				{
					exception._errors.Add(failure.PropertyName, failure.ErrorMessage);
				}

				throw exception;
			}

			try
			{
				await _repository.Update(customer, cancellationToken);
				_logger.LogInformation($"Customer succesfully updated. Customer id: {customer.Id}");
				return customer;
			}
			catch (Exception e)
			{
				throw new UpdateException(customer.Id, e);
			}

		}


		internal Expression<Func<Customer, bool>> GetFilter(string searchString)
		{
			if (string.IsNullOrWhiteSpace(searchString))
				return null;

			var query = searchString.Trim().ToLower();

			var predicate = PredicateBuilder.New<Customer>();
			predicate.Or(customer => customer.FirstName.ToLower().Contains(query));
			predicate.Or(customer => customer.LastName.ToLower().Contains(query));
			predicate.Or(customer => customer.Email.ToLower().Contains(query));
			predicate.Or(customer => customer.CardNumber.ToLower().Contains(query));

			return predicate;
		}

		internal Func<IQueryable<Customer>, IQueryable<Customer>> GetSort(string orderBy, SortDirection? sortDirection)
		{
			if (sortDirection == null)
				return null;

			if (string.IsNullOrWhiteSpace(orderBy))
				return null;

			return customers =>
			{
				switch (orderBy)
				{
					case "firstName":
						if (sortDirection == SortDirection.asc)
						{
							customers = customers.OrderBy(x => x.FirstName);
						}
						else
						{
							customers = customers.OrderByDescending(x => x.FirstName);
						}
						break;

					case "lastName":
						if (sortDirection == SortDirection.asc)
						{
							customers = customers.OrderBy(x => x.LastName);
						}
						else
						{
							customers = customers.OrderByDescending(x => x.LastName);
						}
						break;

					case "email":
						if (sortDirection == SortDirection.asc)
						{
							customers = customers.OrderBy(x => x.Email);
						}
						else
						{
							customers = customers.OrderByDescending(x => x.Email);
						}
						break;
				}

				return customers;
			};
		}
	}
}
