import { ProfileConstants } from '../constants';

export const userType = (role: number): string => {
    switch (role) {
        case ProfileConstants.ADMINISTRATOR:
            return 'Administrador';
        case ProfileConstants.DOCTOR:
            return 'Medico Veterinario';
        case ProfileConstants.RECEPTIONIST:
            return 'Recepcionista';
        default:
            return '';
    }
};