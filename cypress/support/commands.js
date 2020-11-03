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
    cy.get(`#${tableId} th`).should(($columns) => {
        expect($columns.length).equal(columnNames.length)
        $columns.each((i, $column) => {
            expect($column).to.have.property('innerText').equal(columnNames[i])
        })
    })
})

Cypress.Commands.add('clickRowEditButton', (tableId, rowIndex) => {
    cy.get(`#${tableId} tbody tr `).within($rows => {
        const $columns = $rows[rowIndex].children
        for (let w = 0; w < $columns.length; w++) {
            if($columns[w].firstChild.nodeName === 'A' && $columns[w].firstChild.textContent === 'Edit'){
                cy.wrap($columns[w].firstChild).click()
                break
            }
        }
    })
})

Cypress.Commands.add('stubGraphQlCalls', () => {
    cy.route2(
        {
            method: 'POST',
            url: 'http://localhost:8080/v1/graphql',
        },
        (req) => {
            const operationName = JSON.parse(req.body).operationName
            const type = operationName.substr(operationName, operationName.lastIndexOf('_'))
            const resource = operationName.substr(operationName.lastIndexOf('_') + 1)
            let fixture
            switch (type) {
                case 'get_list':
                    fixture = `${resource}List.json`
                    break
                case 'get_one':
                    fixture = `${resource}GetOne.json`
                    break
                case 'update':
                    fixture = `${resource}Edit.json`
                    break
                default:
                    break
            }
            const response = {
                headers: {
                    'access-control-allow-origin': '*', // Avoid CORS issues
                },
                fixture,
            }
            req.reply(response)
        }
    ).as('graphQL')
})
