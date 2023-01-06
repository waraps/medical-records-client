import { IPatient } from '../network';

export interface IPatientsList {
    id: number;
    avatar: string;
    name: string;
    owner: string;
    sex_id: string;
    race: string;
    specie: string;
    color: string;
    birth: string;
    neutered: string;
    created_by: string;
    createdAt: string;
    patient: IPatient;
}
