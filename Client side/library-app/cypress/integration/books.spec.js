/// <reference types="cypress" />

const login = () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[id="username"]').click().type('admin');
    cy.get('input[id="password"]').click().type('admin');
    cy.get('.btn').contains('Login').click();
};

describe('Books page test', () => {

    before(() => {
        login();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.wait(500);
    });

    it('has displayed navbar', () => {
        cy.visit('http://localhost:4200/book');
        cy.get('.books').contains('Books').should('exist');
        cy.get('.customers').contains('Customers').should('exist');
        cy.get('button img[alt="united-kingdom"]').should('be.visible');
        cy.get('button img[alt="russia"]').should('be.visible');
        cy.get('button img[alt="croatia"]').should('be.visible');
    });

    it('has displayed add button', () => {
        cy.get('.add-button').should('be.visible').contains('Add book');
    });

    it('has displayed search bar', () => {
        cy.get('.search-form-field').should('be.visible');
    });

    it('has displayed table', () => {
        cy.get('div table').should('be.visible');
    });

    it('table has 5 elements', () => {
        cy.get('tr[id="rows"]').its('length').should('eq', 5);
    });

    it('should change language to russian', () => {
        cy.get('button img[alt="russia"]').click();
        cy.contains('Книги');
        cy.contains('Клиенты');
        cy.contains('Название');
        cy.contains('Автор');
        cy.contains('Издатель');
        cy.contains('Дата публикации');
        cy.contains('Статус');
        cy.contains('Команды');
    });

    it('should change language to croatian', () => {
        cy.get('button img[alt="croatia"]').click();
        cy.contains('Knjige');
        cy.contains('Klijenti');
        cy.contains('Naslov');
        cy.contains('Autor');
        cy.contains('Izdavač');
        cy.contains('Datum izdavanja');
        cy.contains('Status');
        cy.contains('Naredbe');
    });

    it('should change language to english', () => {
        cy.get('button img[alt="united-kingdom"]').click();
        cy.contains('Books');
        cy.contains('Customers');
        cy.contains('Title');
        cy.contains('Author');
        cy.contains('Publisher');
        cy.contains('Date of publication');
        cy.contains('Status');
        cy.contains('Actions');
    });

    it('should change page next', () => {
        cy.intercept('https://localhost:5001/Book/GetAll*').as('getBooks');
        cy.get('.mat-paginator-navigation-next').click();
        cy.wait('@getBooks');
        cy.get('.mat-paginator-range-label').contains(' 6 – 10 of 15 ');
        cy.get('.mat-paginator-navigation-next').click();
        cy.wait('@getBooks');
        cy.get('.mat-paginator-range-label').contains(' 11 – 15 of 15 ');
    });

    it('should change page previous', () => {
        cy.intercept('https://localhost:5001/Book/GetAll*').as('getBooks');
        cy.get('.mat-paginator-navigation-previous').click();
        cy.wait('@getBooks');
        cy.get('.mat-paginator-range-label').contains(' 6 – 10 of 15 ');
        cy.get('.mat-paginator-navigation-previous').click();
        cy.wait('@getBooks');
        cy.get('.mat-paginator-range-label').contains(' 1 – 5 of 15 ');
    });

    it('should change items per page', () => {
        cy.intercept('https://localhost:5001/Book/GetAll*').as('getBooks');
        cy.get('.mat-select-arrow').click();
        cy.get('.mat-option[ng-reflect-value="10"]').click();
        cy.wait('@getBooks');
        cy.get('tr[id="rows"]').its('length').should('eq', 10);
        cy.get('.mat-select-arrow').click();
        cy.get('.mat-option[ng-reflect-value="25"]').click();
        cy.wait('@getBooks');
        cy.get('tr[id="rows"]').its('length').should('eq', 15);
        cy.get('.mat-select-arrow').click();
        cy.get('.mat-option[ng-reflect-value="5"]').click();
        cy.wait('@getBooks');
        cy.get('tr[id="rows"]').its('length').should('eq', 5);
    });

    it('should filter items', () => {
       cy.intercept('https://localhost:5001/Book/GetAll*').as('getBooks');
       cy.get('.mat-input-element').click().type('Think');
       cy.wait('@getBooks');
       cy.get('tr[id="rows"]').its('length').should('eq', 2);
       cy.contains('Think and Grow Rich');
       cy.contains('Thinking, Fast and Slow');
       cy.get('.mat-input-element').click().clear();
    });

    it('should delete book', () => {
        cy.intercept('https://localhost:5001/Book/Delete/*').as('deleteBook');
        cy.intercept('https://localhost:5001/Book/GetAll*').as('getBooks');
        cy.get('table').find('tr').eq(0).find('th')
            .eq(0).click();
        cy.wait('@getBooks');
        cy.get('table').find('tr').eq(1).find('td')
            .eq(5).find('button[color="warn"]').click();
        cy.wait('@deleteBook');    
        cy.get('tr[id="rows"]').its('length').should('eq', 4);
     });

    it('should open add form', () => {
        cy.get('.add-button').click();
        cy.get('.example-form').should('be.visible');
     });

     it('should display error under inputs', () => {
        cy.get('input[formControlName="title"]').click();
        cy.get('input[formControlName="author"]').click();
        cy.get('input[formControlName="publisher"]').click();
        cy.get('input[formControlName="dateOfPublication"]').click();
        cy.get('input[formControlName="title"]').click();
        cy.get('.mat-form-field-invalid').should('be.visible');
        cy.get('button[type="submit"]').should('be.disabled');
     });

     it('should create new book', () => {
        cy.intercept('https://localhost:5001/Book/Create').as('addBook');
        cy.get('input[formControlName="title"]').click().type('1 Test');
        cy.get('input[formControlName="author"]').click().type('1 Test');
        cy.get('input[formControlName="publisher"]').click().type('1 Test');
        cy.get('input[formControlName="dateOfPublication"]').click().type('1/20/2021');
        cy.get('button[type="submit"]').should('be.enabled');
        cy.get('button[type="submit"]').click();
        cy.wait('@addBook');
        cy.wait(1500);
        cy.get('tr[id="rows"]').its('length').should('eq', 5);
     });

     it('should open update form', () => {
        cy.wait(500);
        cy.get('table').find('tr').eq(2).find('td')
            .eq(5).find('button[color="primary"]').click();
        cy.get('.example-form').should('be.visible');
     });

     it('should update new book', () => {
        cy.intercept('https://localhost:5001/Book/Update*').as('updateBook');
        cy.get('input[formControlName="title"]').click().type(' Update');
        cy.wait(500);
        cy.get('button[type="submit"]').click();
        cy.wait('@updateBook');
        cy.wait(500);
        cy.get('tr[id="rows"]').its('length').should('eq', 5);
        cy.get('tr[id="rows"]').eq(1).contains('Deep Work Update');
        // Return to default title //
        cy.get('table').find('tr').eq(2).find('td')
            .eq(5).find('button[color="primary"]').click();
        cy.get('input[formControlName="title"]').click().clear().type('Deep Work');
        cy.get('button[type="submit"]').click();
     });

     it('should open lend form', () => {
        cy.get('table').find('tr').eq(2).find('td')
            .eq(5).find('button[color="accent"]').click();
        cy.get('.example-form').should('be.visible');
     });

     it('should display error on lend', () => {
        cy.wait(500);
        cy.get('input[formControlName="cardNumber"]').click().type('010');
        cy.get('.num-validation').should('be.visible');
        cy.wait(500);
        cy.contains('does not exist');
     });

     it('should lend a book', () => {
        cy.intercept('https://localhost:5001/Lend/Lend/*').as('lendBook');
        cy.get('input[formControlName="cardNumber"]').click().clear().type('678');
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.wait('@lendBook');
        cy.visit('http://localhost:4200/customer');
        cy.get('table').find('tr').eq(2).find('td')
            .eq(4).find('button[color="accent"]').click();
        cy.get('tr[id="lendRows"]').its('length').should('eq', 1);
     });

     it('should return a book', () => {
        cy.intercept('https://localhost:5001/Lend/Return/*').as('returnBook');
        cy.visit('http://localhost:4200/book');
        cy.get('.mat-paginator-navigation-next').click();
        cy.wait(1000);
        cy.get('.mat-paginator-range-label').contains(' 6 – 10 of 15 ');
        cy.get('.mat-paginator-navigation-next').click();
        cy.wait(1000);
        cy.get('.mat-paginator-range-label').contains(' 11 – 15 of 15 ');
        cy.get('table').find('tr').eq(5).find('td')
            .eq(5).find('.lend-return-button').click();
        cy.wait('@returnBook');
        cy.visit('http://localhost:4200/customer');
        cy.get('table').find('tr').eq(2).find('td')
            .eq(4).find('button[color="accent"]').click();
        cy.get('.emptyTable').should('be.visible');

     });

     afterEach(() => {
        cy.saveLocalStorage();
     });

});