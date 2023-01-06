import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppointmentReducer } from './IAppointmentReducer';
import { currentAppointment } from './AppointmentThunks';
import { IAppointment } from '../../interfaces';

const initialState: IAppointmentReducer = {
    appointment: undefined,
    loading: false,
    success: undefined,
    error: undefined
};

export const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {},
    extraReducers: builder => {
        // me
        builder.addCase(currentAppointment.pending, (state: IAppointmentReducer) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(currentAppointment.fulfilled, (state: IAppointmentReducer, { payload }: PayloadAction<IAppointment>) => {
            state.appointment = payload;
        });
        builder.addCase(currentAppointment.rejected, (state: IAppointmentReducer, action) => {
            state.loading = false;
            state.error = {
                ...action.error,
                message: action.error.message || 'Ha ocurrido un error'
            };
        });
    }
});
