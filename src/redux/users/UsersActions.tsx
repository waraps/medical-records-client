import React from 'react';
import { Dispatch } from 'react';
import API from '../../api/api';
import { IUsersActions } from './IUsersActions';
import { UsersConstants } from './UsersConstants';
import { IError, IUser, IUserUpdateReq } from '../../interfaces';

const userRetrieve = (): any => async (dispatch: Dispatch<IUsersActions>) => {
    dispatch({ type: UsersConstants.GET_USERS_REQUEST });

    return await API.get<IUser>('/users/me')
        .then((response) => {
            dispatch({
                type: UsersConstants.GET_USERS_SUCCESS,
                user: response.data
            });
        })
        .catch((error: IError) =>
            dispatch({
                type: UsersConstants.POST_USERS_FAILURE,
                error
            })
        );
};

const userUpdate =
  (user: IUserUpdateReq): any =>
      (dispatch: Dispatch<IUsersActions>) => {};

// reset errors
const resetErrors = (): any => (dispatch: Dispatch<IUsersActions>) => {
    dispatch({ type: UsersConstants.RESET_ERRORS });
};

export const UsersActions = {
    userRetrieve,
    userUpdate,
    resetErrors
};
