import { PetSexConstants } from '../constants';

export const getPetSex = (sex: number): string => {
    switch (sex) {
        case PetSexConstants.MACHO:
            return 'Macho';
        case PetSexConstants.HEMBRA:
            return 'Hembra';
        default:
            return '';
    }
};