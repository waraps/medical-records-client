import { AppointmentStatusConstants } from '../../../constants';
import { IPatient } from './IPatient';
import { IUser } from './IUser';

export interface IMedicalAppointment {
    id: number;
    status: AppointmentStatusConstants;
    patient_id: number;
    patient: IPatient;
    user_id: number;
    user: IUser;
    createdAt: Date;
    updatedAt: Date; 
}