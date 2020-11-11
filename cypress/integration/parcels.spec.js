/// <reference types="cypress" />
/*global cy*/

describe('Store', () => {
    beforeEach(() => {
        cy.stubGraphQlCalls()
        cy.visit('/#/parcel')
        cy.login()
    })

    it('should load parcels icon', () => {
        cy.get('#parcel-icon').should('exist')
    })

    it('should load table', () => {
        cy.get('#parcel-list').within(() => {
            let expectedColumnNames = ['Id', 'Name', 'Opening date', 'Closing date', '', '']
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

    it('should load show screen with summary and orders tabs', () => {
        cy.clickShowButton('parcel-table', 0)
        cy.get('a[id = "parce-show-summary-tab"]').should('exist')
        cy.get('span[id = "id"]').should('exist')
        cy.get('span[id = "name"]').should('exist')
        cy.get('span[id = "opening_date"]').should('exist')
        cy.get('span[id = "closing_date"]').should('exist')
        cy.get('a[id = "parce-show-order-tab"]').click()
        // Wait for other resources to finish loading before asserting fields
        cy.get('span:contains("Amazon")').should('exist')
        cy.get('span:contains("UPS")').should('exist')
        // Begin assertions for this tab...
        cy.get('span[id = "item_name"]').should('exist')
        cy.get('span[id = "cost"]').should('exist')
        cy.get('span[id = "weight"]').should('exist')
        cy.get('span[id = "order_date"]').should('exist')
        cy.get('span[id = "tracking_id"]').should('exist')
        cy.get('span[id = "shipping_date"]').should('exist')
        cy.get('span[id = "delivery_date"]').should('exist')
    })

    // TODO Add integration tests for add and edit order from the show screen
})