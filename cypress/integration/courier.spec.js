/// <reference types="cypress" />
/*global cy*/

describe('Courier', () => {
    it('should load couriers icon', () => {
        cy.visit('/')
        cy.get('#courier-icon').should('exist')
    })

    it('should load table with its filters', () => {
        cy.visit('/')
        cy.get('#courier-list').within(() => {
            cy.get('#courier-filter').within(() => {
                cy.get('#courier-active-filter').should('be.checked')
            })
            let expectedColumnNames = ['Id', 'Name', 'Active']
            cy.checkTableColumns('courier-table', expectedColumnNames)
        })
    })
})