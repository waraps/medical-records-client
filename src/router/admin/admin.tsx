import React from 'react';
import { RouteObject } from 'react-router-dom';

import { FiHome, FiUsers, FiUser } from 'react-icons/fi';
import { BiTestTube } from 'react-icons/bi';
import { BsClockHistory } from 'react-icons/bs';
import { GiCat } from 'react-icons/gi';

import { Account, AddUser, AdminMain, EditOwner, EditUser, NotFound, Owners, PatientDetails, Patients, Room, Tests, Users } from '../../pages';
import { ILinkItem } from '../../interfaces';

export const adminLinks: ILinkItem[] = [
    { name: 'Inicio', icon: FiHome, path: '/' },
    { name: 'Sala de Espera', icon: BsClockHistory, path: '/sala-de-espera' },
    { name: 'Usuarios',
        icon: FiUsers,
        childrens: [
            { name: 'Listar', icon: FiUsers, path: '/usuarios/lista' },
            { name: 'Agregar', icon: FiUsers, path: '/usuarios/nuevo' },
            { name: 'Editar', icon: FiUsers, path: '/usuarios/editar' },
        ]
    },
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
        path: '/usuarios/lista',
        element: <Users />,
    },
    {
        path: '/usuarios/nuevo',
        element: <AddUser />,
    },
    {
        path: '/usuarios/editar',
        element: <EditUser />,
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
        path: '/propietarios/editar/:id',
        element: <EditOwner />,
    },
    {
        path: '/cuenta',
        element: <Account />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
