import React from 'react';
import { Navigate } from 'react-router-dom';
import { ISession } from '../interfaces';
import { getCredentials } from '../lib';

interface IAuthRoutes {
  children: JSX.Element;
}

export const AuthRoutes = ({ children }: IAuthRoutes): JSX.Element => {
    const credentials: string | null = getCredentials();
    const userCredentials = credentials && credentials.length ? (JSON.parse(credentials) as ISession) : undefined;

    if (Boolean(userCredentials?.isAuthenticated)) {
        return <Navigate to="/" />;
    }

    return children;
};
