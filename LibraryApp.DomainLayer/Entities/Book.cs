using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.DomainLayer.Entities
{
	public class Book : BaseEntity
	{
		public string Title { get; set; }
		public string Author { get; set; }
		public string Publisher { get; set; }
		public DateTime DateOfPublication { get; set; }
	}
}
