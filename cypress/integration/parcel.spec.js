/// <reference types="cypress" />
/*global cy*/

describe('Store', () => {
    beforeEach(() => {
        cy.stubGraphQlCalls()
        cy.visit('/#/parcel')
    })

    it('should load parcels icon', () => {
        cy.get('#parcel-icon').should('exist')
    })

    it('should load table', () => {
        cy.get('#parcel-list').within(() => {
            let expectedColumnNames = ['Id', 'Name', 'Opening date', 'Closing date', '']
            cy.checkTableColumns('parcel-table', expectedColumnNames)
        })
    })

    it('should load edit screen with id field and name, opening date and closing date inputs', () => {
        cy.clickRowEditButton('parcel-table', 0)
        cy.get('span[id = "id"]').should('exist')
        cy.get('input[name = "name"]').should('exist')
        cy.get('input[name = "opening_date"]').should('exist')
        cy.get('input[name = "closing_date"]').should('exist')
    })

    it('should load create screen with name and active inputs', () => {
        cy.get('[href="#/parcel/create"]').click()
        cy.get('input[name = "name"]').should('exist')
        cy.get('input[name = "opening_date"]').should('exist')
    })
})