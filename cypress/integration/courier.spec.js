/// <reference types="cypress" />
/*global cy*/

describe('Courier', () => {
    it('should load couriers icon', () => {
        cy.visit('/')
        cy.get('#courier-icon').should('exist')
    })

    it('should load list', () => {
        cy.visit('/')
        cy.get('#courier-list').should('exist')
        // TODO Add filter and columns validation
    })
})