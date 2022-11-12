import { IUsersActions } from './IUsersActions';
import { UsersConstants } from './UsersConstants';
import { IUsersReducer } from './IUsersReducer';

export class UsersReducer {
    public static readonly initialState: IUsersReducer = {
        user: undefined,
        loading: false,
        success: undefined,
        error: undefined
    };

    public static reducer (
        state: IUsersReducer = UsersReducer.initialState,
        action: IUsersActions
    ): IUsersReducer {
        switch (action.type) {
            // GET USER REQUEST
            case UsersConstants.GET_USERS_REQUEST:
                return {
                    ...state,
                    success: false,
                    error: undefined
                };
            case UsersConstants.GET_USERS_SUCCESS:
                return {
                    ...state,
                    user: action.user
                };
            case UsersConstants.GET_USERS_FAILURE:
                return {
                    ...state,
                    error: action.error
                };
                // MODIFY USER
            case UsersConstants.PUT_USERS_REQUEST:
                return {
                    ...state,
                    loading: true,
                    success: undefined,
                    error: undefined
                };
            case UsersConstants.PUT_USERS_SUCCESS:
                return {
                    ...state,
                    user: action.user,
                    loading: false,
                    success: true
                };
            case UsersConstants.PUT_USERS_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.error,
                    success: false
                };
                // RESET STATE
            case UsersConstants.RESET_USER_STATE:
                return {
                    ...action.initial
                };
                // RESET ERRORS
            case UsersConstants.RESET_ERRORS:
                return {
                    ...state,
                    error: undefined,
                    loading: false,
                    success: false
                };
            default:
                return state;
        }
    }
}
