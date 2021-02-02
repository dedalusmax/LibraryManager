/// <reference types="cypress" />

describe('Loging page test', () => {


    beforeEach(() => {

    });

    it('should navigate to login page', () => {
        cy.visit('http://localhost:4200/login');
        cy.url().should('eq','http://localhost:4200/login');
    });

    it('has a welcome message', () => {
        cy.wait(3000);
        cy.contains('Welcome');
        cy.contains('to LibAID');
    });

    it('has displayed form', () => {
        cy.get('input[id="username"]').should('be.visible');
            
        cy.get('input[id="password"]').should('be.visible');
         
        cy.get('form a').should('be.visible').contains('Forgot Password?');
    });


    it('has a login button', () => {
        cy.get('.btn').should('be.visible').contains('Login').click();
    });

    it('should login', () => {
        cy.get('input[id="username"]').click().type('admin');
        cy.get('input[id="password"]').click().type('admin');;
        cy.get('.btn').contains('Login').click();
        
    });

    it('should navigate to books page', () => {
        cy.url().should('eq','http://localhost:4200/book');
    });

});