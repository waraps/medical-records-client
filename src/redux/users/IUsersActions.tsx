import { Action } from 'redux';
import { IUsersReducer } from './IUsersReducer';
import { UsersConstants } from './UsersConstants';
import { IError, IUser, IUserUpdateReq } from '../../interfaces';

// register
export interface IPostUsersRequest extends Action {
  type: UsersConstants.POST_USERS_REQUEST
}

export interface IPostUsersSuccess extends Action {
  type: UsersConstants.POST_USERS_SUCCESS
  user: IUser
}

export interface IPostUsersFailure extends Action {
  type: UsersConstants.POST_USERS_FAILURE
  error: IError
}

// retrieve
export interface IGetUsersRequest extends Action {
  type: UsersConstants.GET_USERS_REQUEST
}

export interface IGetUsersSuccess extends Action {
  type: UsersConstants.GET_USERS_SUCCESS
  user: IUser
}

export interface IGetUsersFailure extends Action {
  type: UsersConstants.GET_USERS_FAILURE
  error: IError
}

// update
export interface IPutUsersRequest
  extends Action<UsersConstants.PUT_USERS_REQUEST> {
  type: UsersConstants.PUT_USERS_REQUEST
  req: IUserUpdateReq
}

export interface IPutUsersSuccess
  extends Action<UsersConstants.PUT_USERS_SUCCESS> {
  type: UsersConstants.PUT_USERS_SUCCESS
  user: IUser
}

export interface IPutUsersFailure
  extends Action<UsersConstants.PUT_USERS_FAILURE> {
  type: UsersConstants.PUT_USERS_FAILURE
  error: IError
}

// reset state
export interface IUserStateReset extends Action {
  type: UsersConstants.RESET_USER_STATE
  initial: IUsersReducer
}

// reset errors
export interface IUserResetErrors extends Action {
  type: UsersConstants.RESET_ERRORS
}

export type IUsersActions =
  // register
  | IPostUsersRequest
  | IPostUsersSuccess
  | IPostUsersFailure
  // retrieve
  | IGetUsersRequest
  | IGetUsersSuccess
  | IGetUsersFailure
  // update
  | IPutUsersRequest
  | IPutUsersSuccess
  | IPutUsersFailure
  // reset state
  | IUserStateReset
  // reset errors
  | IUserResetErrors
