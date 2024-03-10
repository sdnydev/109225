import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { FirePage } from '../features/fires/fire.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <FirePage />,
      },
    ],
  },
]);
