import { Reducer, combineReducers } from '@reduxjs/toolkit';
import { IAppState } from '../interfaces/state';
import { userSlice } from './user';
import { authSlice } from './auth';

export const reducers: Reducer = combineReducers<IAppState>({
    auth: authSlice.reducer,
    user: userSlice.reducer,
});

export type RootState = ReturnType<typeof reducers>;
