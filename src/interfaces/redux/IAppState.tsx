import { IAuthReducer } from '../../redux/auth';
import { IUsersReducer } from '../../redux/users/IUsersReducer';

export interface IAppState {
    auth: IAuthReducer;
    user: IUsersReducer;
}
