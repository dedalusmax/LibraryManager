using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net;

namespace LibraryApp.Models
{
	public class ErrorDetails
	{
		public HttpStatusCode Status { get; set; }
		public string Message { get; set; }
		public string Errors { get; set; }
		public override string ToString()
		{
			var settings = new JsonSerializerSettings() { ContractResolver = new CamelCasePropertyNamesContractResolver() };
			return JsonConvert.SerializeObject(this, settings);
		}
	}
}
