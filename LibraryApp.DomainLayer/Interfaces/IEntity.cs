using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.DomainLayer.Interfaces
{
	public interface IEntity
	{
		Guid Id { get; set; }
	}
}
