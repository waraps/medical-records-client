import { Reducer, combineReducers } from '@reduxjs/toolkit';
import { IAppState } from '../interfaces/state';
import { userSlice } from './user';
import { authSlice } from './auth';
import { appointmentSlice } from './appointment';

export const reducers: Reducer = combineReducers<IAppState>({
    auth: authSlice.reducer,
    user: userSlice.reducer,
    appointment: appointmentSlice.reducer,
});

export type RootState = ReturnType<typeof reducers>;
