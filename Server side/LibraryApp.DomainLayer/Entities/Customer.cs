using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.DomainLayer.Entities
{
	public class Customer : BaseEntity
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string CardNumber { get; set; }
		public string Email { get; set; }
		public List<Book> LendedBooks { get; set; }
	}
}
