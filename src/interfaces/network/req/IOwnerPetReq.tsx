export interface IOwnerPetReq {
    first_name: string;
    last_name: string;
    dni: string;
    phone: string;
    address: string;
    email: string;
    occupation: string;
    housing: string;
    other_pets: boolean;
    specie: string
    race: string
    name: string
    birth: Date;
    color: string
    sex_id: number;
    neutered: boolean;
    owner_id?: number;
}