using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.DomainLayer.Entities;
using LibraryApp.DomainLayer.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
		[Authorize]
		public async Task<IActionResult> GetAll([FromQuery] BookParameters bookParameters, CancellationToken cancellationToken)
		{
			var books = await _bookService.GetAll(bookParameters, cancellationToken);

			var metadata = new
			{
				books.TotalCount,
				books.PageSize,
				books.CurrentPage,
				books.TotalPages,
				books.HasNext,
				books.HasPrevios
			};

			Response.Headers.Add("pagination", JsonConvert.SerializeObject(metadata));

			return Ok(books);
		}

		[HttpGet("{id}")]
		[Authorize]
		public async Task<IActionResult> Get(Guid id, CancellationToken cancellationToken)
		{
			return Ok(await _bookService.Get(id, cancellationToken));
		}

		[HttpPost]
		[Authorize]
		public async Task<IActionResult> Create([FromBody] Book book, CancellationToken cancellationToken)
		{
			return Ok(await _bookService.Create(book, cancellationToken));
		}

		[HttpPut]
		[Authorize]
		public async Task<IActionResult> Update([FromBody] Book book, CancellationToken cancellationToken)
		{
			return Ok(await _bookService.Update(book, cancellationToken));
		}

		[HttpDelete("{id}")]
		[Authorize]
		public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
		{
			return Ok(await _bookService.Delete(id, cancellationToken));
		}

	}
}
