using FluentValidation;
using LibraryApp.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.BusinessLayer.Validators
{
	public class BookValidator : AbstractValidator<Book>
	{
		public BookValidator()
		{
			RuleFor(x => x.Title).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Title is required");
			RuleFor(x => x.Author).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Author is required");
			RuleFor(x => x.Publisher).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Publisher is required");
			RuleFor(x => x.DateOfPublication).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Title is required")
											 .Must(dateOfPublication => IsNotInFuture(dateOfPublication)).WithMessage("Publication date cannot be in the future");
			
		}

		public bool IsNotInFuture(DateTime dateOfPublication)
		{
			return dateOfPublication < DateTime.Now;
		}
	}
}
