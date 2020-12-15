using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.BusinessLayer.Exceptions
{
	public class CreateException : Exception
	{
		public CreateException(string message, Exception ex = null)
			: base ($"Could not create entity.\nMessage: {message}", ex)
		{
		}

		public CreateException(Exception ex = null) 
			: base($"Could not create entity.", ex)
		{
		}

	}
}
