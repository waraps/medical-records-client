
import { IPetSex } from './IPetSex';
import { IUser } from './IUser';

export interface IPatient {
  id: number;
  avatar: string;
  specie: string
  race: string
  name: string
  birth: Date;
  color: string
  sex_id: number;
  neutered: boolean;
  owner_id: number;
  // records: IRecord;
  created_by: number;
  createdAt: Date;
  updatedAt: Date;
  pet_sex: IPetSex,
  user: IUser,
}
