import { IPatient } from './IPatient';

export interface IOwner {
    id: number;
    first_name: string;
    last_name: string;
    dni: string;
    phone: string;
    address: string;
    email: string;
    occupation: string;
    housing: string;
    other_pets: boolean;
    avatar: string;
    pets: IPatient[];
    createdAt: Date;
    updatedAt: Date;
}