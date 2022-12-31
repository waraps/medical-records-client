import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';
import { UserConstants } from './UserConstants';
import { IUser } from '../../interfaces';

export const me = createAsyncThunk(
    UserConstants.USER_ME,
    async (): Promise<IUser> => {
        const response = await API.get<IUser>('/users/me');
        return response.data;
    });
