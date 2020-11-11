/// <reference types="cypress" />
/*global cy*/

describe('Store', () => {
    beforeEach(() => {
        cy.stubGraphQlCalls()
        cy.visit('/#/store')
        cy.login()
    })

    it('should load stores icon', () => {
        cy.get('#store-icon').should('exist')
    })

    it('should load table with its filters', () => {
        cy.get('#store-list').within(() => {
            cy.get('#store-filter').within(() => {
                cy.get('#store-active-filter').should('be.checked')
            })
            let expectedColumnNames = ['Id', 'Name', 'Active', '']
            cy.checkTableColumns('store-table', expectedColumnNames)
        })
    })

    it('should load edit screen with id field and name and active inputs', () => {
        cy.clickRowEditButton('store-table', 0)
        cy.get('span[id = "id"]').should('exist')
        cy.get('input[name = "name"]').should('exist')
        cy.get('input[name = "active"]').should('exist')
    })

    it('should load create screen with name and active inputs', () => {
        cy.get('[href="#/store/create"]').click()
        cy.get('input[name = "name"]').should('exist')
        cy.get('input[name = "active"]').should(input => {
            expect(input).to.be.disabled
            expect(input).to.be.checked
        })
    })
})