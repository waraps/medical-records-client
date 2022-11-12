import { IError, IUser } from '../../interfaces';

export interface IUsersReducer {
  user?: IUser
  loading: boolean
  success?: boolean
  error?: IError
}
