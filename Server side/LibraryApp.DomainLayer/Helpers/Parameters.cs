using LibraryApp.DomainLayer.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.DomainLayer.Helpers
{
    public class Parameters : PaginationQueryParams
    {
        public string SearchString { get; set; }

        public string OrderBy { get; set; }

        public SortDirection? SortDirection { get; set; }
    }
}
