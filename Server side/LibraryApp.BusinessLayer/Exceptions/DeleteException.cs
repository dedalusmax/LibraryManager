using System;

namespace LibraryApp.BusinessLayer.Exceptions
{
	public class DeleteException : Exception
	{
		public DeleteException(Guid id, string message, Exception ex = null)
			: base($"Could not delete entity. \nEntity id: {id}\nMessage: {message}", ex) 
		{ 
		}

		public DeleteException(Guid id, Exception ex = null)
			: base($"Could not delete entity.\nEntity id: {id}", ex)
		{
		}
	}
}
