import { AppointmentStatusConstants } from '../constants';

export const getAppointmentStatus = (status: string): string => {
    switch (status) {
        case AppointmentStatusConstants.WAITING:
            return 'En espera';
        case AppointmentStatusConstants.IN_PROGRESS:
            return 'Siendo atendida';
        case AppointmentStatusConstants.FINISHED:
            return 'Finalizada';
        default:
            return '';
    }
};