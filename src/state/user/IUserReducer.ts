import { IError, IUser } from '../../interfaces';

export interface IUserReducer {
    user?: IUser;
    loading: boolean;
    success?: boolean;
    error?: IError;
}
