import { IAppointment, IUser } from '../network';

export interface IRoom {
    id: number;
    status: string;
    patient_id: number;
    patient: string;
    doctor_id: number;
    doctor: IUser;
    createdAt: string;
    updatedAt: string;
    appointment?: IAppointment;
}
