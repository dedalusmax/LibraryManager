using LibraryApp.BusinessLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.Controllers
{
	public class LendController : BaseController
	{
		private readonly ILendService _lendService;

		public LendController(ILendService lendService)
		{
			_lendService = lendService;
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Lend (Guid id, string lenderCardNumber, CancellationToken cancellationToken)
		{
			return Ok(await _lendService.Lend(id, lenderCardNumber, cancellationToken));
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Return(Guid id, string lenderCardNumber, CancellationToken cancellationToken)
		{
			return Ok(await _lendService.Return(id, lenderCardNumber, cancellationToken));
		}
	}
}
