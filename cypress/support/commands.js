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
            expect($columns.length).equal(columnNames.length)
            $columns.each((i, $column) => {
                expect($column).to.have.property('innerText').equal(columnNames[i])
            })
        })
    })
})

const getOperationName = (query) => 
    query.replace(/(\r\n|\n|\r)/gm,'')  // Delete line breaks
        .split('{')[0]                  // Get the string until first {
            .split(' ')[1]              // Get second word

Cypress.Commands.add('stubGraphQlCalls', () => {
    cy.route2(
        {
            method: 'POST',
            url: 'http://localhost:8080/v1/graphql',
        },
        (req) => {
            const query = JSON.parse(req.body).query
            const operationName = getOperationName(query)
            let fixture
            switch (operationName) {
                case 'get_list_courier':
                    fixture = 'courier.json'
                    break;
                case 'get_list_store':
                    fixture = 'store.json'
                    break;
                default:
                    break;
            }
            const response = {
                fixture,
                headers: {
                    'access-control-allow-origin': '*' // Avoid CORS issues
                }
            }
            req.reply(response)
        }
    )
})
