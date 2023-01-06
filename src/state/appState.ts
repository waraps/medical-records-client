import { IAppState } from '../interfaces/state';
import { appointmentSlice } from './appointment';
import { authSlice } from './auth/AuthSlice';
import { userSlice } from './user/UserSlice';

export const appState: IAppState = {
    auth: authSlice.getInitialState(),
    user: userSlice.getInitialState(),
    appointment: appointmentSlice.getInitialState(),
};
