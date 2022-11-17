export interface IPatientReq {
    avatar?: string;
    specie: string
    race: string
    name: string
    birth: Date;
    color: string
    sex_id: number;
    neutered: boolean;
    owner_id?: number;
}
        