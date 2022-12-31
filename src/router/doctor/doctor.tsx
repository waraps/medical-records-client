import React from 'react';
import { RouteObject } from 'react-router-dom';

import { FiHome, FiSettings, FiTrendingUp } from 'react-icons/fi';
import { Account, DoctorMain, NotFound } from '../../pages';
import { ILinkItem } from '../../interfaces';

export const doctorLinks: ILinkItem[] = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending',
        icon: FiTrendingUp,
        childrens: [
            { name: 'Home', icon: FiHome },
            { name: 'Settings', icon: FiSettings },
        ]
    },
];

export const doctorRoutes: RouteObject[] = [
    {
        path: '/',
        element: <DoctorMain />,
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
