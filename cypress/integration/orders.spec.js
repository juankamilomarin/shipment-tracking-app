/// <reference types="cypress" />
/*global cy*/

describe('Orders', () => {
    beforeEach(() => {
        cy.stubGraphQlCalls()
        cy.visit('/#/order')
        cy.login()
        cy.get('[href="#/parcel/1"]', { timeout: 10000 }).should('be.visible')
        cy.get('[href="#/store/1"]', { timeout: 10000 }).should('be.visible')
        cy.get('[href="#/courier/1"]', { timeout: 10000 }).should('be.visible')
    })

    it('should load store orders icon', () => {
        cy.get('#order-icon').should('exist')
    })

    it('should load table with its filters', () => {
        cy.get('#order-list').within(() => {
            let expectedColumnNames = [
                'Id', 'Item name', 'Parcel', 'Store', 'Cost', 
                'Weight', 'Order date', 'Courier', 'Tracking id', 
                'Shipping date', 'Delivery date', ''
            ]
            cy.checkTableColumns('order-table', expectedColumnNames)
        })
    })

    it('should load edit screen with fields and inputs', () => {
        cy.clickRowEditButton('order-table', 0)
        // Wait for other resources to finish loading before asserting inputs
        cy.get('div[id = "parcel_id"]').should('have.html', 'Appliances for the house')
        cy.get('div[id = "store_id"]').should('have.html', 'Barnes &amp; Noble')
        cy.get('div[id = "courier_id"]').should('have.html', 'Amazon')
        // Begin assertions...
        cy.get('span[id = "id"]').should('exist')
        cy.get('input[name = "item_name"]').should('exist')
        cy.get('input[name = "parcel_id"]').should('exist')
        cy.get('input[name = "store_id"]').should('exist')
        cy.get('input[name = "cost"]').should('exist')
        cy.get('input[name = "weight"]').should('exist')
        cy.get('input[name = "order_date"]').should('exist')
        cy.get('input[name = "courier_id"]').should('exist')
        cy.get('input[name = "tracking_id"]').should('exist')
        cy.get('input[name = "shipping_date"]').should('exist')
        cy.get('input[name = "delivery_date"]').should('exist')
    })

    it('should load create screen with name and active inputs', () => {
        cy.get('[href="#/order/create"]').click()
        // Wait for other resources to finish loading before asserting inputs
        cy.get('div[id = "parcel_id"]').should('exist')
        cy.get('div[id = "store_id"]').should('exist')
        cy.get('div[id = "courier_id"]').should('exist')
        // Begin assertions...
        cy.get('input[name = "item_name"]').should('exist')
        cy.get('input[name = "parcel_id"]').should('exist')
        cy.get('input[name = "store_id"]').should('exist')
        cy.get('input[name = "cost"]').should('exist')
        cy.get('input[name = "weight"]').should('exist')
        cy.get('input[name = "order_date"]').should('exist')
        cy.get('input[name = "courier_id"]').should('exist')
        cy.get('input[name = "tracking_id"]').should('exist')
        cy.get('input[name = "shipping_date"]').should('exist')
        cy.get('input[name = "delivery_date"]').should('exist')
    })
})