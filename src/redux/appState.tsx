import { IAppState } from '../interfaces';
import { AuthReducer } from './auth';
import { UsersReducer } from './users';

export const appState: IAppState = {
    auth: AuthReducer.initialState,
    user: UsersReducer.initialState
};
