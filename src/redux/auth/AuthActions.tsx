/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import { UsersConstants, UsersReducer } from '../users';
import { IAuthActions } from './IAuthActions';
import { IUsersActions } from '../users/IUsersActions';
import { AuthConstants } from './AuthConstants';
import { ISession } from '../../interfaces';
import API from '../../api/api';
import { removeCredentials, storeCredentials } from '../../lib';

const signup = (): any => {
    return (dispatch: Dispatch<IUsersActions | IAuthActions>) => null;
};

const signin = (email: string, password: string, navigateTo: () => void): any => {
    return (dispatch: Dispatch<IAuthActions>) => {
        dispatch({ type: AuthConstants.POST_LOGIN_REQUEST });
        API.post('/auth/signin', { email, password })
            .then((response) => {
                const { access_token: accessToken, refresh_token: refreshToken } = response.data;
                const session: ISession = {
                    token: accessToken,
                    refresh_token: refreshToken,
                    isAuthenticated: true
                };
                storeCredentials(session);
                dispatch({
                    type: AuthConstants.POST_LOGIN_SUCCESS,
                    token: accessToken
                });
                navigateTo();
            })
            .catch((error) => {
                removeCredentials();
                dispatch({
                    type: AuthConstants.POST_LOGIN_FAILURE,
                    error
                });
            });
    };
};

const logout = (navigateTo: () => void): any => {
    return (dispatch: Dispatch<IAuthActions | any>) => {
        dispatch({ type: AuthConstants.POST_LOGOUT_REQUEST });
        API.post('/auth/logout')
            .then(async () => {
                removeCredentials();
                dispatch(resetStateLogout());
                dispatch({ type: AuthConstants.POST_LOGOUT_SUCCESS });
                navigateTo();
            })
            .catch((error) => {
                removeCredentials();
                dispatch(resetStateLogout());
                dispatch({ type: AuthConstants.POST_LOGOUT_FAILURE, error });
                navigateTo();
            });
    };
};

const resetStateLogout = (): any => {
    return (dispatch: Dispatch<IAuthActions | any>) => {
        return dispatch({
            type: UsersConstants.RESET_USER_STATE,
            initial: UsersReducer.initialState
        });
    };
};

export const AuthActions = {
    signup,
    signin,
    logout,
    resetStateLogout
};
