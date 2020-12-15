using LibraryApp.DomainLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.DomainLayer
{
    public static class DbSeeder
    {
        public static void Seed(this ModelBuilder builder)
        {
            builder.SeedBooks();
        }

        private static void SeedBooks(this ModelBuilder builder)
        {

            var book = new Book()
            {
                Id = Guid.Parse("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                Author = "Mario Rozic",
                DateOfPublication = new DateTime(1982, 6, 1),
                Publisher = "Skolska knjiga"
            };

            builder.Entity<Book>().HasData(book);

        }
    }
}
