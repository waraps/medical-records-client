import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Account, AddPatient, EditOwner, EditPatient, NotFound, PatientDetails, Patients, ReceptionistMain, ReceptionistOwners } from '../../pages';
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
            { name: 'Agregar', icon: FiUsers, path: '/pacientes/nuevo' },
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
        path: '/pacientes/lista',
        element: <Patients />,
    },
    {
        path: '/paciente/:id',
        element: <PatientDetails />,
    },
    {
        path: '/pacientes/nuevo',
        element: <AddPatient />,
    },
    {
        path: '/paciente/editar/:id',
        element: <EditPatient />,
    },
    {
        path: '/propietarios',
        element: <ReceptionistOwners />,
    },
    {
        path: '/propietarios/editar',
        element: <EditOwner />,
    },
    {
        path: '/cuenta',
        element: <Account />,
    },
    {
        path: '*',
        element: (
            <NotFound />
        ),
    },
];
