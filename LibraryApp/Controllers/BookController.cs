using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApp.Controllers
{
	public class BookController : BaseController
	{
		private readonly IBookService _bookService;

		public BookController(IBookService bookService)
		{
			_bookService = bookService;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
		{
			return Ok(await _bookService.GetAll(cancellationToken));
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(Guid id, CancellationToken cancellationToken)
		{
			return Ok(await _bookService.Get(id, cancellationToken));
		}

		[HttpPost] 
		public async Task<IActionResult> Create([FromBody] Book book, CancellationToken cancellationToken)
		{
			return Ok(await _bookService.Create(book, cancellationToken));
		}

		[HttpPut]
		public async Task<IActionResult> Update([FromBody] Book book, CancellationToken cancellationToken)
		{
			await _bookService.Update(book, cancellationToken);
			return Ok();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete([FromBody] Guid id, CancellationToken cancellationToken)
		{
			await _bookService.Delete(id, cancellationToken);
			return Ok();
		}

	}
}
