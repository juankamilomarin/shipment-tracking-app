// TODO: Add another App Icon
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import setupProvider from './authProvider/setupProvider';

if(!window.config.auth.localMode) setupProvider()
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);