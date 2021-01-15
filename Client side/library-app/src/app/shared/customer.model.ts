import { Book } from './book.model';

export interface Customer {
    id: string;
    cardNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    lendedBooks: Book [];
}