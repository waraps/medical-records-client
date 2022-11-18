import React from 'react';
import { useSelector } from 'react-redux';
import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from 'react-router-dom';

import { IAppState } from '../interfaces';
import { IUsersReducer } from '../redux/users/IUsersReducer';

import { PublicRoute } from './public-route';
import { Login, NotFound, Register } from '../pages';

import { adminRoutes } from './administrator';
import { doctorRoutes } from './doctor';
import { receptionistRoutes } from './receptionist';

const Router = () => {
    let routes: RouteObject[] = adminRoutes;

    const { user } = useSelector<IAppState, IUsersReducer>(
        (state: IAppState) => state.user
    );

    switch (user?.rol_id) {
        case 2:
            routes = doctorRoutes;
            break;

        case 3:
            routes = receptionistRoutes;
            break;
    }

    const router = createBrowserRouter([
        ...routes,
        {
            path: '/login',
            element: (
                <PublicRoute>
                    <Login />
                </PublicRoute>
            ),
        },
        {
            path: '/register',
            element: (
                <PublicRoute>
                    <Register />
                </PublicRoute>
            ),
        },
        {
            path: '*',
            element: (
                <NotFound />
            ),
        },
    ]);

    return <RouterProvider router={router} />;
};

export { Router };
