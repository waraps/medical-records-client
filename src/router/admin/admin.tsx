import React from 'react';
import { RouteObject } from 'react-router-dom';

import { FiHome, FiUsers, FiUser } from 'react-icons/fi';
import { BiTestTube } from 'react-icons/bi';
import { BsClockHistory } from 'react-icons/bs';
import { GiCat } from 'react-icons/gi';

import { Account, AddUser, AdminMain, ChangePassword, DetailsOwner, DetailsUser, EditAccount, NotFound, Owners, PatientDetails, Patients, Room, Tests, Users } from '../../pages';
import { ILinkItem } from '../../interfaces';

export const adminLinks: ILinkItem[] = [
    { name: 'Inicio', icon: FiHome, path: '/' },
    { name: 'Sala de Espera', icon: BsClockHistory, path: '/sala-de-espera' },
    { name: 'Usuarios', icon: FiUsers, path: '/usuarios' },
    { name: 'Examenes', icon: BiTestTube, path: '/examenes' },
    { name: 'Pacientes', icon: GiCat, path: '/pacientes' },
    { name: 'Propietarios', icon: FiUser, path: '/propietarios' },
];

export const adminRoutes: RouteObject[] = [
    {
        path: '/',
        element: <AdminMain />,
    },
    {
        path: '/sala-de-espera',
        element: <Room />,
    },
    {
        path: '/usuarios',
        element: <Users />,
    },
    {
        path: '/usuario/nuevo',
        element: <AddUser />,
    },
    {
        path: '/usuario/:id',
        element: <DetailsUser />,
    },
    {
        path: '/examenes',
        element: <Tests />,
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
        element: <NotFound />,
    },
];
