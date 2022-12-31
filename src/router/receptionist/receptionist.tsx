import React from 'react';
import { RouteObject } from 'react-router-dom';

import { FiHome, FiSettings, FiTrendingUp } from 'react-icons/fi';
import { Account, NotFound, ReceptionistMain } from '../../pages';
import { ILinkItem } from '../../interfaces';

export const receptionistLinks: ILinkItem[] = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending',
        icon: FiTrendingUp,
        childrens: [
            { name: 'Home', icon: FiHome },
            { name: 'Settings', icon: FiSettings },
        ]
    },
];

export const receptionistRoutes: RouteObject[] = [
    {
        path: '/',
        element: <ReceptionistMain />,
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
