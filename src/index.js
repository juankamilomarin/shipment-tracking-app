// TODO: Add another App Icon
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import setupProvider from './authProvider/setupProvider';

setupProvider()
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);