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

Cypress.Commands.add('login', () => {
    cy.get('input[name = "username"]').type('username')
    cy.get('input[name = "password"]').type('password')
    cy.get('span:contains("Sign in")').click()
})

Cypress.Commands.add('checkTableColumns', (tableId, columnNames) => {
    cy.get(`#${tableId} th`).should(($columns) => {
        expect($columns.length).equal(columnNames.length)
        $columns.each((i, $column) => {
            expect($column).to.have.property('innerText').equal(columnNames[i])
        })
    })
})

const clickOnButton = (tableId, rowIndex, buttonName) => {
    cy.get(`#${tableId} tbody tr `).within($rows => {
        const $columns = $rows[rowIndex].children
        for (let w = 0; w < $columns.length; w++) {
            if($columns[w].firstChild && $columns[w].firstChild.nodeName === 'A' && $columns[w].firstChild.textContent === buttonName){
                cy.wrap($columns[w].firstChild).click()
                break
            }
        }
    })
}

Cypress.Commands.add('clickRowEditButton', (tableId, rowIndex) => {
    clickOnButton(tableId, rowIndex, 'Edit')
})

Cypress.Commands.add('clickShowButton', (tableId, rowIndex) => {
    clickOnButton(tableId, rowIndex, 'Show')
})

const GET_LIST = 'get_list'
const GET_MANY = 'get_many'
const GET_MANY_REFERENCE = 'get_many_reference'
const GET_ONE = 'get_one'
const UPDATE = 'update'
const UPDATE_MANY = 'update_many'
const INSERT = 'insert'

const getTypeAndResource = (operationName) => {
    let type, resource
    if(operationName.indexOf(`${GET_LIST}_`) === 0){
        type = GET_LIST
        resource = operationName.substr(GET_LIST.length + 1)
    } else if(operationName.indexOf(`${GET_MANY_REFERENCE}_`) === 0){
        type = GET_MANY_REFERENCE
        resource = operationName.substr(GET_MANY_REFERENCE.length + 1)
    } else if(operationName.indexOf(`${GET_MANY}_`) === 0){
        type = GET_MANY
        resource = operationName.substr(GET_MANY.length + 1)
    } else if(operationName.indexOf(`${GET_ONE}_`) === 0){
        type = GET_ONE
        resource = operationName.substr(GET_ONE.length + 1)
    } else if(operationName.indexOf(`${UPDATE_MANY}_`) === 0){
        type = UPDATE_MANY
        resource = operationName.substr(UPDATE_MANY.length + 1)
    } else if(operationName.indexOf(`${UPDATE}_`) === 0){
        type = UPDATE
        resource = operationName.substr(UPDATE.length + 1)
    } else if(operationName.indexOf(`${INSERT}_`) === 0){
        type = INSERT
        resource = operationName.substr(INSERT.length + 1)
    }
    return [type, resource]
}

Cypress.Commands.add('stubGraphQlCalls', () => {
    return cy.route2(
        {
            method: 'POST',
            url: 'http://localhost:8080/v1/graphql',
        },
        (req) => {
            const operationName = JSON.parse(req.body).operationName
            const [type, resource] = getTypeAndResource(operationName)
            let fixture
            switch (type) {
                case GET_LIST:
                    fixture = `${resource}List.json`
                    break
                case GET_MANY:
                case GET_MANY_REFERENCE:
                    fixture = `${resource}Many.json`
                    break
                case GET_ONE:
                    fixture = `${resource}GetOne.json`
                    break
                case UPDATE:
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
    )
})
