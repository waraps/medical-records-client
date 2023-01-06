import { IAppointment, IError } from '../../interfaces';

export interface IAppointmentReducer {
    appointment?: IAppointment;
    loading: boolean;
    success?: boolean;
    error?: IError;
}
