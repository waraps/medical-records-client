import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthConstants } from './AuthConstants';
import { API } from '../../api';
import { ISession } from '../../interfaces';
import { removeCredentials, storeCredentials } from '../../lib';

export const signin = createAsyncThunk(
    AuthConstants.AUTH_SIGNIN,
    async ({ email, password }: { email: string, password: string }): Promise<ISession> => {
        const response = await API.post('/auth/signin', { email, password });
        const { access_token: accessToken, refresh_token: refreshToken, rol } = response.data;
        const session: ISession = {
            token: accessToken,
            refresh_token: refreshToken,
            rol: rol,
            isAuthenticated: true
        };

        storeCredentials(session);
        window.location.replace('/');
        return session;
    });

export const signout = createAsyncThunk(
    AuthConstants.AUTH_SIGNOUT,
    async (): Promise<void> => {
        await API.post('/auth/logout');
        removeCredentials();
        window.location.replace('/signin');
    });
