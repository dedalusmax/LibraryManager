using Microsoft.AspNetCore.Mvc;

namespace LibraryApp.Controllers
{
	[ApiController]
	[Route("[controller]/[action]")]
	public abstract class BaseController : ControllerBase
    {
    }
}
