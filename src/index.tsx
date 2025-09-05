import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss'
import {RouterProvider} from 'react-router';
import {router} from 'src/app/routes';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Root element #root not found');
}

const root = createRoot(container);
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
