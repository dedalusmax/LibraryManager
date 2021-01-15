using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.DomainLayer.Entities;
using LibraryApp.DomainLayer.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.Controllers
{
	public class CustomerController : BaseController
	{
		private readonly ICustomerService _customerService;

		public CustomerController(ICustomerService customerService)
		{
			_customerService = customerService;
		}

		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> GetAll([FromQuery] Parameters customerParameters, CancellationToken cancellationToken)
		{
			var customers = await _customerService.GetAll(customerParameters, cancellationToken);

			var metadata = new
			{
				customers.TotalCount,
				customers.PageSize,
				customers.CurrentPage,
				customers.TotalPages,
				customers.HasNext,
				customers.HasPrevios
			};

			Response.Headers.Add("pagination", JsonConvert.SerializeObject(metadata));

			return Ok(customers);
		}

		[HttpGet("{id}")]
		[AllowAnonymous]
		public async Task<IActionResult> Get(Guid id, CancellationToken cancellationToken)
		{
			return Ok(await _customerService.Get(id, cancellationToken));
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<IActionResult> Create([FromBody] Customer customer, CancellationToken cancellationToken)
		{
			return Ok(await _customerService.Create(customer, cancellationToken));
		}

		[HttpPut]
		[AllowAnonymous]
		public async Task<IActionResult> Update([FromBody] Customer customer, CancellationToken cancellationToken)
		{
			return Ok(await _customerService.Update(customer, cancellationToken));
		}

		[HttpDelete("{id}")]
		[AllowAnonymous]
		public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
		{
			return Ok(await _customerService.Delete(id, cancellationToken));
		}

	}
}
