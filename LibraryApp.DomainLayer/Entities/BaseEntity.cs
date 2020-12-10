using LibraryApp.DomainLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.DomainLayer.Entities
{
	public class BaseEntity : IEntity
	{
		public Guid Id { get; set; }
	}
}
