import Chat from './components/Chat';
import Login from './components/Login';
import { CHAT_ROUTE, LOGIN_ROUTE } from './utils/consts';

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Login />,
    },
];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        element: <Chat />,
    },
];
