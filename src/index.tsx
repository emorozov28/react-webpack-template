import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import App from './App';
import './App.scss'

const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element #root not found');
}

const root = createRoot(container);
root.render(
    <StrictMode>
        <BrowserRouter>
            <div className={'app'}>
                <App />
            </div>
        </BrowserRouter>
    </StrictMode>
);
