using FluentValidation;
using LibraryApp.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace LibraryApp.BusinessLayer.Validators
{
	public class CustomerValidator : AbstractValidator<Customer>
	{
		public CustomerValidator()
		{
			RuleFor(x => x.FirstName).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Title is required");
			RuleFor(x => x.LastName).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Author is required");
			RuleFor(x => x.Email).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Publisher is required");
			RuleFor(x => x.CardNumber).Cascade(CascadeMode.StopOnFirstFailure).NotEmpty().WithMessage("Title is required");
		}
	}
}
