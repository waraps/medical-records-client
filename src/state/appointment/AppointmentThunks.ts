import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';
import { IAppointment, } from '../../interfaces';
import { AppointmentConstants } from './AppointmentConstants';

export const currentAppointment = createAsyncThunk(
    AppointmentConstants.APPOINTMENT_CURRENT,
    async (): Promise<IAppointment> => {
        const response = await API.get<IAppointment>('/medical-appointment/my/current');
        return response.data;
    });
