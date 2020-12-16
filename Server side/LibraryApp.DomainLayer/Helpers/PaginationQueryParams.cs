using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.DomainLayer.Helpers
{
	public abstract class PaginationQueryParams
	{
		const int MAX_PAGE_SIZE = 25;
		public int PageNumber { get; set; } = 1;
		private int _pageSize = 15;

		public int PageSize
		{
			get
			{
				return _pageSize;
			}

			set
			{
				_pageSize = (value > MAX_PAGE_SIZE) ? MAX_PAGE_SIZE : value;
			}
		}
	}
}
