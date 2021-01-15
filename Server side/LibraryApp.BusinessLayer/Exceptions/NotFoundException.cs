using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.BusinessLayer.Exceptions
{
	public class NotFoundException : Exception
	{
		public NotFoundException(Guid id, string message, Exception ex = null)
			: base($"Entity not found.\nEntity id: {id}\nMessage: {message}", ex)
		{
		}

		public NotFoundException(Guid id, Exception ex = null)
			: base($"Entity not found.\nEntity id: {id}", ex)
		{
		}

		public NotFoundException(String cardNumber, Exception ex = null)
			: base($"Entity not found.\nEntity card number: {cardNumber}", ex)
		{
		}
	}
}
