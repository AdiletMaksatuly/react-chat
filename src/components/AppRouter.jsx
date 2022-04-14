import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { FirebaseContext } from '..';
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';

const AppRouter = () => {
    const { auth } = useContext(FirebaseContext);
    const [user] = useAuthState(auth);

    return user ? (
        <Routes>
            {privateRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to={CHAT_ROUTE} />} />
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
