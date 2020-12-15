using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LibraryApp.Controllers
{
    [ApiController]
	[Route("[controller]/[action]")]
	public abstract class BaseController : ControllerBase
    {
    }
}
