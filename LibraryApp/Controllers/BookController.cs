using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryApp.BusinessLayer.Interfaces;
using LibraryApp.DomainLayer.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApp.Controllers
{
	public class BookController : ControllerBase
	{
		private readonly IBookService _bookService;

		public BookController(IBookService bookService)
		{
			_bookService = bookService;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await _bookService.GetAll());
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(Guid id)
		{
			return Ok(await _bookService.Get(id));
		}

		[HttpPost] 
		public async Task<IActionResult> Create([FromBody] Book book)
		{
			return Ok(await _bookService.Create(book));
		}

		[HttpPut]
		public async Task<IActionResult> Update([FromBody] Book book)
		{
			await _bookService.Update(book);
			return Ok();
		}

		[HttpDelete]
		public async Task<IActionResult> Delete([FromBody] Guid id)
		{
			await _bookService.Delete(id);
			return Ok();
		}

	}
}
