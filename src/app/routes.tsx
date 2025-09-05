import {createBrowserRouter } from 'react-router';
import {HomePage} from 'src/pages/homePage';
import {AboutPage} from 'src/pages/aboutPage';
import App from './app';
import {NotFoundPage} from 'src/pages/notFoundPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {index: true, element: <HomePage />},
            {path: 'about', element: <AboutPage />},
            {path: '*', element: <NotFoundPage />}
        ],
    },
]);