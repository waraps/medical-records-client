import { IAuthReducer } from '../../state/auth';
import { IUserReducer } from '../../state/user';

export interface IAppState {
    auth: IAuthReducer;
    user: IUserReducer;
}
