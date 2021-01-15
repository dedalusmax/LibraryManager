using Microsoft.AspNetCore.Mvc;

namespace LibraryApp.Controllers
{
	public class HealthCheckController : BaseController
	{
		[HttpGet]
		public IActionResult Ping()
		{
			return Ok("Healthy");
		}
	}
}
