import { IAppointment } from './IAppointment';
import { IPatient } from './IPatient';
import { IUser } from './IUser';

export interface IRecord {
    id: number;
    reason?: string;
    revelevant_clinic?: string;
    diagnosis?: string;
    treatment?: string;
    weight?: number;
    appointment_id: number;
    appointment: IAppointment;
    patient_id: number;
    patient: IPatient;
    created_by: number;
    doctor: IUser;
    createdAt: Date;
    updatedAt: Date;
}
