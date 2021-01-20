using FluentValidation;
using LibraryApp.DomainLayer.Entities;
using System;

namespace LibraryApp.BusinessLayer.Validators
{
	public class BookValidator : AbstractValidator<Book>
	{
		public BookValidator()
		{
			RuleFor(x => x.Title).Cascade(CascadeMode.Stop).NotEmpty().WithMessage("Title is required");
			RuleFor(x => x.Author).Cascade(CascadeMode.Stop).NotEmpty().WithMessage("Author is required");
			RuleFor(x => x.Publisher).Cascade(CascadeMode.Stop).NotEmpty().WithMessage("Publisher is required");
			RuleFor(x => x.DateOfPublication).Cascade(CascadeMode.Stop).NotEmpty().WithMessage("Title is required")
											 .Must(dateOfPublication => IsNotInFuture(dateOfPublication)).WithMessage("Publication date cannot be in the future");
			
		}

		public bool IsNotInFuture(DateTime dateOfPublication)
		{
			return dateOfPublication < DateTime.Now;
		}
	}
}
