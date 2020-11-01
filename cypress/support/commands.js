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
            let fixture
            switch (operationName) {
                case 'get_list_courier':
                    fixture = 'courierList.json'
                    break
                case 'get_one_courier':
                    fixture = 'courierGetOne.json'
                    break
                case 'update_courier':
                    fixture = 'courierEdit.json'
                    break
                case 'get_list_store':
                    fixture = 'storeList.json'
                    break
                case 'update_store':
                    fixture = 'storeEdit.json'
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
