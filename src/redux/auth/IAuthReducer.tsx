import { IError } from '../../interfaces';

export interface IAuthReducer {
    loading: boolean;
    token?: string;
    isAuthenticated?: boolean;
    error?: IError;
}
