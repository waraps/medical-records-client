import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { Layout } from '../../layout';
import { Profile, Patients, WaitingRoom, AddPatient } from '../../pages';
import { links } from './receptionist-links';

export const receptionistRoutes: RouteObject[] = [
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
                path: '/patientes',
                element: <Patients />,
            },
            {
                path: '/agregar/paciente',
                element: <AddPatient />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
        ],
    },
];
