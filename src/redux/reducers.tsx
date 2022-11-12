import { combineReducers, Reducer } from 'redux';

// Reducers
import { UsersReducer } from './users';
import { AuthReducer } from './auth';
import { IAppState } from '../interfaces';

export const reducers: Reducer = combineReducers<IAppState>({
    auth: AuthReducer.reducer,
    user: UsersReducer.reducer
});
