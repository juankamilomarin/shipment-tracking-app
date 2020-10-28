/// <reference types="cypress" />
/*global Cypress, cy*/

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('checkTableColumns', (tableId, columnNames) => {
    cy.get(`#${tableId}`).within(() => {
        cy.get('th').should(($columns) => {
            expect($columns.length).equal(3)
            $columns.each((i, $column) => {
                expect($column).to.have.property('innerText').equal(columnNames[i])
            })
        })
    })
})
