/// <reference types="cypress" />

const login = () => {
    cy.visit('http://localhost:4200/login');
    cy.wait(2000);
    cy.get('input[id="username"]').click().type('admin');
    cy.get('input[id="password"]').click().type('admin');
    cy.get('.btn').contains('Login').click();
};

describe('Customer page test', () => {

    before(() => {
        login();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
        cy.wait(500);
    });

    it('has displayed navbar', () => {
        cy.visit('http://localhost:4200/customer');
        cy.get('.books').contains('Books');
        cy.get('.customers').contains('Customers');
        cy.get('button img[alt="united-kingdom"]').should('be.visible');
        cy.get('button img[alt="russia"]').should('be.visible');
        cy.get('button img[alt="croatia"]').should('be.visible');
    });

    it('has displayed add button', () => {
        cy.get('.add-button').should('be.visible').contains('Add customer');
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

    it('should change page next', () => {
        cy.get('.mat-paginator-navigation-next').click();
        cy.wait(1000);
        cy.get('.mat-paginator-range-label').contains(' 6 – 10 of 15 ');
        cy.get('.mat-paginator-navigation-next').click();
        cy.wait(1000);
        cy.get('.mat-paginator-range-label').contains(' 11 – 15 of 15 ');
    });

    it('should change page previous', () => {
        cy.get('.mat-paginator-navigation-previous').click();
        cy.wait(1000);
        cy.get('.mat-paginator-range-label').contains(' 6 – 10 of 15 ');
        cy.get('.mat-paginator-navigation-previous').click();
        cy.wait(1000);
        cy.get('.mat-paginator-range-label').contains(' 1 – 5 of 15 ');
    });

    it('should change items per page', () => {
        cy.get('.mat-select-arrow').click();
        cy.get('.mat-option[ng-reflect-value="10"]').click();
        cy.wait(1000);
        cy.get('tr[id="rows"]').its('length').should('eq', 10);
        cy.get('.mat-select-arrow').click();
        cy.get('.mat-option[ng-reflect-value="25"]').click();
        cy.wait(1000);
        cy.get('tr[id="rows"]').its('length').should('eq', 15);
        cy.get('.mat-select-arrow').click();
        cy.get('.mat-option[ng-reflect-value="5"]').click();
        cy.wait(1000);
        cy.get('tr[id="rows"]').its('length').should('eq', 5);
    });

    it('should filter items', () => {
       cy.get('.mat-input-element').click().type('Goran');
       cy.wait(1000);
       cy.get('tr[id="rows"]').its('length').should('eq', 1);
       cy.contains('Goran');
       cy.get('.mat-input-element').click().clear();
    });

    it('should delete customer', () => {
        cy.wait(1000);
        cy.get('table').find('tr').eq(0).find('th')
            .eq(1).click();

        cy.wait(1000);
        cy.get('table').find('tr').eq(1).find('td')
            .eq(5).find('button[color="warn"]').click();
        cy.wait(2000);    
        cy.get('tr[id="rows"]').its('length').should('eq', 4);
     });

    it('should open add form', () => {
        cy.get('.add-button').click();
        cy.get('.example-form').should('be.visible');
     });

     it('should display error under inputs', () => {
        cy.wait(1000);
        cy.get('input[formControlName="firstName"]').click();
        cy.get('input[formControlName="lastName"]').click();
        cy.get('input[formControlName="email"]').click();
        cy.get('input[formControlName="cardNumber"]').click();
        cy.get('.mat-form-field-invalid').should('be.visible');
        cy.get('button[type="submit"]').should('be.disabled');
     });

     it('should create new customer', () => {
        cy.wait(1000);
        cy.get('input[formControlName="firstName"]').click().type('1 Test');
        cy.get('input[formControlName="lastName"]').click().type('1 Test');
        cy.get('input[formControlName="email"]').click().type('test@gmail.com');
        cy.get('input[formControlName="cardNumber"]').click().type('001');
        cy.wait(1000);
        cy.get('button[type="submit"]').should('be.enabled');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
        cy.get('tr[id="rows"]').its('length').should('eq', 5);
        cy.get('tr[id="rows"]').eq(4).contains('1 Test');
     });

     it('should open update form', () => {
        cy.wait(1000);
        cy.get('table').find('tr').eq(3).find('td')
            .eq(5).find('button[color="primary"]').click();
        cy.get('.example-form').should('be.visible');
     });

     it('should update new customer', () => {
        cy.get('input[formControlName="firstName"]').click().type(' Update');
        cy.wait(1000);
        cy.get('button[type="submit"]').click();
        cy.wait(2000);
        cy.get('tr[id="rows"]').its('length').should('eq', 5);
        cy.get('tr[id="rows"]').eq(2).contains('Ivan Update');
        cy.wait(1000);
        // Return to default title //
        cy.get('table').find('tr').eq(3).find('td')
            .eq(5).find('button[color="primary"]').click();
        cy.get('input[formControlName="firstName"]').click().clear().type('Ivan');
        cy.get('button[type="submit"]').click();
     });

    //  it('should open lend form', () => {
    //     cy.wait(1000);
    //     cy.get('table').find('tr').eq(2).find('td')
    //         .eq(5).find('button[color="accent"]').click();
    //     cy.get('.example-form').should('be.visible');
    //  });

     afterEach(() => {
        cy.saveLocalStorage();
     });

});