using LibraryApp.DomainLayer.Entities;
using LibraryApp.DomainLayer.Helpers;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.BusinessLayer.Interfaces
{
	public interface ICustomerService
	{
		Task<PagedList<Customer>> GetAll(Parameters customerParameters, CancellationToken cancellationToken);
		Task<Customer> Get(Guid id, CancellationToken cancellationToken);
		Task<Customer> GetByCardNumber(String cardNumber, CancellationToken cancellationToken);
		Task<Customer> Create(Customer customer, CancellationToken cancellationToken);
		Task<Customer> Update(Customer customer, CancellationToken cancellationToken);
		Task<Guid> Delete(Guid lenderCardNumber, CancellationToken cancellationToken);
	}
}
