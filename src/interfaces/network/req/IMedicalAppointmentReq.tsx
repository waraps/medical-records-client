import { AppointmentStatusConstants } from '../../../constants';

export interface IMedicalAppointmentReq {
    status: AppointmentStatusConstants;
    patient_id: number;
    user_id?: number;
}