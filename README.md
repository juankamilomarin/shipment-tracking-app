# Shipment Tracking Application

React admin application which uses a Hasura back end server and a Postgres database to manage your personal shipments.

If you like to buy things on Amazon, eBay, Target and other online shops this application helps you keep track of the orders you have in process.
Every time you create a new order, you are asked to associate the online shop and courier with some additional data.
Orders are grouped into parcels. Parcels are useful when you want to consolidate your orders and then re-send them to another country (in my case, Colombia). 

## Concepts you will see on this application

* How to work with React-Admin
    *   Use of list, create, edit and filter components
    *   Creation of custom data provider (using GraphQL + Hasura)
    *   Use of i8n
    *   Use a custom theme
* How to build GraphQL queries
* How to work with Jest and React Testing Library for unit testing
* How to work with Cypress for E2E testing
* How to setup a simple Hasura local container
* How to use feature flags in your app
* How to authenticate your users using a Cognito pool via AWS Amplify

## Technlogoies

* Front end
    * React 17.0.1 - Using [Create React App](https://github.com/facebook/create-react-app).
    * [React Admin](https://marmelab.com/react-admin/) - A frontend Framework for building admin applications running in the browser, on top of REST/GraphQL APIs, using ES6, React and Material Design
    * AWS Amplify to authenticate the app against a Cognito pool
* Back end
    * [Hasura](https://hasura.io/) - Instant GraphQL server with authorization for your data
* Database
    * Postgres 12.2

## Installation

### Hasura + postgres

<b>Step 1: Get docker-compose</b>

Get docker-compose file from the hasura repo

`curl https://raw.githubusercontent.com/hasura/graphql-engine/stable/install-manifests/docker-compose/docker-compose.yaml -o docker-compose.yml`

<b>Step 2: Run Hasura GraphQL engine & Postgres</b>

Run this command under your `hasura-postgres` folder

`docker-compose up`

<b>Step 3: Create the Shipment Tracking DB tables</b>

Run the `create-tables.sql` file on the newly Postgres database. You can run this directly on Hasura (Go to http://localhost:8080/console/data/sql) or in your favorite DB IDE.
 Once you run it, you should see the following tables:
 * courier
 * store
 * parcel
 * store_order

<b>Step 4: Track all tables and foreign-key relationships in Hasura</b>

On the same tab click on Track All option for both tables and foreign-keys

### React application
Once your hasura instance is running simply run your React app by running `npm start`. The application comes with the local mode by default. In this mode you can login using any username/password combination (which is stored in the localStorage).

If your want to authenticate the application against a Cognito pool simple set localMode to false and provide the Cognito info (region, userPoolId and userPoolWebClientId) in the `public/config.js` file.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverage`

Launches the test runner reporting the coverage for all the files. Take into account that all index.js files are ignored since these are tested via integration tests on Cypress

### `npm run cypress`

Launches [cypress](https://www.cypress.io/) test runner. Remember to  also run the React App prior to run this command.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Contributor

Juan Camilo Marin
