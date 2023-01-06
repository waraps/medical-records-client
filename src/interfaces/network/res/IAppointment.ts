
import { AppointmentStatusConstants } from '../../../constants';
import { IPatient } from './IPatient';
import { IRecord } from './IRecord';
import { IUser } from './IUser';

export interface IAppointment {
    id: number;
    status: AppointmentStatusConstants;
    patient_id: number;
    patient: IPatient;
    doctor_id: number;
    doctor: IUser;
    record: IRecord;
    createdAt: Date;
    updatedAt: Date;
}
