import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ForgotPassword, Signin } from '../pages';
import { AuthRoutes } from './auth-routes';
import { ProtectedRoutes } from './protected-routes';
import { Layout } from '../layout';
import { useAppSelector } from '../state/hooks';
import { adminLinks, adminRoutes } from './admin';
import { doctorLinks, doctorRoutes } from './doctor';
import { receptionistLinks, receptionistRoutes } from './receptionist';
import { ILinkItem } from '../interfaces';

export const Router = (): JSX.Element => {
    const { role } = useAppSelector(state => state.auth);
    let routes: RouteObject[] = [];
    let links: ILinkItem[] = [];

    switch (role) {
        case 1:
            routes  = adminRoutes;
            links  = adminLinks;
            break;
        case 2:
            routes = doctorRoutes;
            links = doctorLinks;
            break;
        case 3:
            routes = receptionistRoutes;
            links = receptionistLinks;
            break;
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ProtectedRoutes>
                    <Layout links={links} />
                </ProtectedRoutes>
            ),
            children: routes,
        },
        {
            path: '/signin',
            element: (
                <AuthRoutes>
                    <Signin />
                </AuthRoutes>
            )
        },
        {
            path: '/recuperar/contraseña',
            element: (
                <AuthRoutes>
                    <ForgotPassword />
                </AuthRoutes>
            )
        },
    ]);
    return <RouterProvider router={router} />;
};
