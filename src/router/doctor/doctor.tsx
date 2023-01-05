import React from 'react';
import { RouteObject } from 'react-router-dom';

import { Account, ChangePassword, DetailsOwner, DoctorMain, DoctorRoom, EditAccount, NotFound, Owners, PatientDetails, Patients, Tests } from '../../pages';
import { ILinkItem } from '../../interfaces';

import { FiHome, FiUser } from 'react-icons/fi';
import { GiCat } from 'react-icons/gi';
import { BiTestTube } from 'react-icons/bi';
import { BsClockHistory } from 'react-icons/bs';

export const doctorLinks: ILinkItem[] = [
    { name: 'Inicio', icon: FiHome, path: '/' },
    { name: 'Sala de Espera', icon: BsClockHistory, path: '/sala-de-espera' },
    { name: 'Examenes', icon: BiTestTube, path: '/examenes' },
    { name: 'Pacientes', icon: GiCat, path: '/pacientes' },
    { name: 'Propietarios', icon: FiUser, path: '/propietarios' },
];

export const doctorRoutes: RouteObject[] = [
    {
        path: '/',
        element: <DoctorMain />,
    },
    {
        path: '/sala-de-espera',
        element: <DoctorRoom />,
    },
    {
        path: '/pacientes',
        element: <Patients />,
    },
    {
        path: '/paciente/:id',
        element: <PatientDetails />,
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
        path: '/examenes',
        element: <Tests />,
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
