import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthReducer } from './IAuthReducer';
import { ISession } from '../../interfaces';
import { signin, signout } from './AuthThunks';
import { getCredentials } from '../../lib';

const credentials: string | null = getCredentials();
const userCredentials = credentials && credentials.length ? (JSON.parse(credentials) as ISession) : undefined;

const initialState: IAuthReducer = {
    loading: false,
    token: userCredentials?.token || undefined,
    isAuthenticated: false,
    role: userCredentials?.rol || undefined,
    error: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // signin
        builder.addCase(signin.pending, (state: IAuthReducer) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(signin.fulfilled, (state: IAuthReducer, action: PayloadAction<ISession>) => {
            const { token, rol } = action.payload;

            state.loading = false;
            state.token = token;
            state.role = rol;
            state.isAuthenticated = true;
            state.error = undefined;
        });
        builder.addCase(signin.rejected, (state: IAuthReducer, action) => {
            state.loading = false,
            state.error = {
                ...action.error,
                message: action.error.message || 'Ha ocurrido un error'
            };
        });

        // signout
        builder.addCase(signout.pending, (state: IAuthReducer) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(signout.fulfilled, (state: IAuthReducer) => {
            state.loading = false;
            state.token = undefined;
            state.role = undefined;
            state.isAuthenticated = false;
            state.error = undefined;
        });
        builder.addCase(signout.rejected, (state: IAuthReducer, action) => {
            state.loading = false,
            state.error = {
                ...action.error,
                message: action.error.message || 'Ha ocurrido un error'
            };
        });
    }
});
