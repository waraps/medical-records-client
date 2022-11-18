import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { Layout } from '../../layout';
import { AddUser, Profile, Patients, User, WaitingRoom, AddPatient, Owners, Tests, SendPatientToRoom } from '../../pages';
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
                path: '/enviar-a-sala',
                element: <SendPatientToRoom />,
            },
            {
                path: '/usuarios',
                element: <User />,
            },
            {
                path: '/agregar/usuario',
                element: <AddUser />,
            },
            {
                path: '/pacientes',
                element: <Patients />,
            },
            {
                path: '/agregar/paciente',
                element: <AddPatient />,
            },
            {
                path: '/propietarios',
                element: <Owners />,
            },
            {
                path: '/examenes',
                element: <Tests />,
            },
            {
                path: '/perfil',
                element: <Profile />,
            },
        ],
    },
];
