import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Account, AddPatient, ChangePassword, DetailsOwner, EditAccount, NotFound, Owners, PatientDetails, PatientToRoom, Patients, ReceptionistMain } from '../../pages';
import { ILinkItem } from '../../interfaces';
import { FiUsers } from 'react-icons/fi';
import { BsClockHistory } from 'react-icons/bs';
import { GiCat } from 'react-icons/gi';

export const receptionistLinks: ILinkItem[] = [
    { name: 'Sala de Espera',
        icon: BsClockHistory,
        childrens: [
            { name: 'Pacientes en Sala', icon: FiUsers, path: '/' },
            { name: 'Enviar a Sala', icon: FiUsers, path: '/enviar/paciente' },
        ]
    },
    { name: 'Pacientes',
        icon: GiCat,
        childrens: [
            { name: 'Listar', icon: FiUsers, path: '/pacientes/lista' },
            { name: 'Registar', icon: FiUsers, path: '/paciente/nuevo' },
        ]
    },
    { name: 'Propietarios', icon: FiUsers, path: '/propietarios' },
];

export const receptionistRoutes: RouteObject[] = [
    {
        path: '/',
        element: <ReceptionistMain />,
    },
    {
        path: '/enviar/paciente',
        element: <PatientToRoom />,
    },
    {
        path: '/pacientes/lista',
        element: <Patients />,
    },
    {
        path: '/paciente/:id',
        element: <PatientDetails />,
    },
    {
        path: '/paciente/nuevo',
        element: <AddPatient />,
    },
    {
        path: '/propietarios',
        element: <Owners />,
    },
    {
        path: '/propietario/:id',
        element: <DetailsOwner />,
    },
    {
        path: '/cuenta',
        element: <Account />,
    },
    {
        path: '/cuenta/actualizar',
        element: <EditAccount />,
    },
    {
        path: '/cambiar/contraseña',
        element: <ChangePassword />,
    },
    {
        path: '*',
        element: (
            <NotFound />
        ),
    },
];
