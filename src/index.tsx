import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartContextProvider } from './lib/CartContext/CartContext';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <CartContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CartContextProvider>
    </React.StrictMode>
);
