import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';
import { IUserReducer } from './IUserReducer';
import { me } from './UserThunks';

const initialState: IUserReducer = {
    user: undefined,
    loading: false,
    success: undefined,
    error: undefined
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState: () => initialState,
    },
    extraReducers: builder => {
        // me
        builder.addCase(me.pending, (state: IUserReducer) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(me.fulfilled, (state: IUserReducer, { payload }: PayloadAction<IUser>) => {
            state.user = payload;
        });
        builder.addCase(me.rejected, (state: IUserReducer, action) => {
            state.loading = false;
            state.error = {
                ...action.error,
                message: action.error.message || 'Ha ocurrido un error'
            };
        });
    }
});

export const { resetUserState } = userSlice.actions;
