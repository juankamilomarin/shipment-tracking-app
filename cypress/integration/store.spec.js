/// <reference types="cypress" />
/*global cy*/

describe('Store', () => {
    beforeEach(() => {
        cy.stubGraphQlCalls()
    })

    it('should load stores icon', () => {
        cy.visit('/')
        cy.get('#store-icon').should('exist')
    })

    it('should load table with its filters', () => {
        cy.visit('/#/store')
        cy.get('#store-list').within(() => {
            cy.get('#store-filter').within(() => {
                cy.get('#store-active-filter').should('be.checked')
            })
            let expectedColumnNames = ['Id', 'Name', 'Active']
            cy.checkTableColumns('store-table', expectedColumnNames)
        })
    })
})