/// <reference types="cypress" />
/*global cy*/

describe('Courier', () => {

    beforeEach(() => {
        cy.stubGraphQlCalls()
        cy.visit('/#/courier')
        cy.login()
    })

    it('should load couriers icon', () => {
        cy.get('#courier-icon').should('exist')
    })

    it('should load table with its filters', () => {
        cy.get('#courier-list').within(() => {
            cy.get('#courier-filter').within(() => {
                cy.get('#courier-active-filter').should('be.checked')
            })
            let expectedColumnNames = ['Id', 'Name', 'Active', '']
            cy.checkTableColumns('courier-table', expectedColumnNames)
        })
    })

    it('should load edit screen with id field and name and active inputs', () => {
        cy.clickRowEditButton('courier-table', 0)
        cy.get('span[id = "id"]').should('exist')
        cy.get('input[name = "name"]').should('exist')
        cy.get('input[name = "active"]').should('exist')
    })

    it('should load create screen with name and active inputs', () => {
        cy.get('[href="#/courier/create"]').click()
        cy.get('input[name = "name"]').should('exist')
        cy.get('input[name = "active"]').should(input => {
            expect(input).to.be.disabled
            expect(input).to.be.checked
        })
    })
})