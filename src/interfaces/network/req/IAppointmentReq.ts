import { AppointmentStatusConstants } from '../../../constants';

export interface IAppointmentReq {
    status: AppointmentStatusConstants;
    patient_id: number;
    doctor_id?: number;
}
