import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { Layout } from '../../layout';
import { Profile, Patients, WaitingRoom } from '../../pages';
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
                path: '/pacientes',
                element: <Patients />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
];