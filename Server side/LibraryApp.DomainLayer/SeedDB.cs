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
            builder.SeedCustomers();
        }

        private static void SeedBooks(this ModelBuilder builder)
        {

            var book = new Book()
            {
                Id = Guid.Parse("0faee6ac-1772-4bbe-9990-a7d9a22dd559"),
                Title = "Uspavanka za Radmilu M",
                Author = "Mario Rozic",
                DateOfPublication = new DateTime(1982, 6, 1),
                Publisher = "Skolska knjiga"
            };

            builder.Entity<Book>().HasOne(b => b.Lender).WithMany(l => l.LendedBooks);
            builder.Entity<Book>().HasData(book);

        }

        private static void SeedCustomers(this ModelBuilder builder)
        {

            var customer = new Customer()
            {
                Id = Guid.Parse("1c758f4b-e740-403b-a425-a01c4a798d42"),
                FirstName = "Marko",
                LastName = "Markovic",
                Email = "markomarkovic@gmail.com"
            };

            builder.Entity<Customer>().HasData(customer);

        }


    }
}
