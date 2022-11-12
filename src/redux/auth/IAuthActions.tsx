import { Action } from 'redux';
import { AuthConstants } from './AuthConstants';
import { IError } from '../../interfaces';

// login
export interface IPostLoginRequest extends Action {
  type: AuthConstants.POST_LOGIN_REQUEST
}

export interface IPostLoginSuccess extends Action {
  type: AuthConstants.POST_LOGIN_SUCCESS
  token: string
}

export interface IPostLoginFailure extends Action {
  type: AuthConstants.POST_LOGIN_FAILURE
  error?: IError
}

// logout
export interface IPostLogoutRequest extends Action {
  type: AuthConstants.POST_LOGOUT_REQUEST
}

export interface IPostLogoutSuccess extends Action {
  type: AuthConstants.POST_LOGOUT_SUCCESS
}

export interface IPostLogoutFailure extends Action {
  type: AuthConstants.POST_LOGOUT_FAILURE
  error: IError
}

export type IAuthActions =
    // login
    | IPostLoginRequest
    | IPostLoginSuccess
    | IPostLoginFailure
    // logout
    | IPostLogoutRequest
    | IPostLogoutSuccess
    | IPostLogoutFailure
