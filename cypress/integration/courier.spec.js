/// <reference types="cypress" />
/*global cy*/

describe('Courier', () => {
    beforeEach(() => {
        cy.stubGraphQlCalls()
        cy.visit('/')
    })

    it('should load couriers icon', () => {
        cy.get('#courier-icon').should('exist')
    })

    it('should load table with its filters', () => {
        cy.get('#courier-list').within(() => {
            cy.get('#courier-filter').within(() => {
                cy.get('#courier-active-filter').should('be.checked')
            })
            let expectedColumnNames = ['Id', 'Name', 'Active']
            cy.checkTableColumns('courier-table', expectedColumnNames)
        })
    })
})