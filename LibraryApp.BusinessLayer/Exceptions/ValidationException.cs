using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.BusinessLayer.Exceptions
{
	public class ValidationException : Exception
	{
		public Dictionary<string, string> _errors = new Dictionary<string, string>();

		public ValidationException(string entityName, Dictionary<string, string> errors, Exception ex = null)
			: base($"Message: Validation failed for {entityName}", ex)
		{
			_errors = errors;
		}

		public ValidationException(string entityName, Exception ex = null)
			: base($"Message: Validation failed for {entityName}", ex)
		{
		}
	}
}
