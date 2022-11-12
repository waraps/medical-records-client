import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Layout } from '../../layout';
import { Profile, Records, WaitingRoom } from '../../pages';
import { ProtectedRoute } from '../protected-route';
import { links } from './doctor-links';

export const doctorRoutes: RouteObject[] = [
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
                path: '/historias',
                element: <Records />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
];