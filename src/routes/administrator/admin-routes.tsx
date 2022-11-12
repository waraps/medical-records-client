import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Layout } from '../../layout';
import { Profile, Records, User, WaitingRoom } from '../../pages';
import { ProtectedRoute } from '../protected-route';
import { links } from './admin-links';

export const adminRoutes: RouteObject[] = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout links={links} />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '/',
                element: <WaitingRoom />,
            },
            {
                path: '/usuarios',
                element: <User />,
            },
            {
                path: '/historias',
                element: <Records />,
            },
            {
                path: '/perfil',
                element: <Profile />,
            },
        ],
    },
];
