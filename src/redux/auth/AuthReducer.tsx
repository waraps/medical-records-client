import { AuthConstants } from './AuthConstants';
import { IAuthActions } from './IAuthActions';
import { IAuthReducer } from './IAuthReducer';

export class AuthReducer {
    public static readonly initialState: IAuthReducer = {
        loading: false,
        token: undefined,
        isAuthenticated: false,
        error: undefined
    };

    public static reducer (state: IAuthReducer = AuthReducer.initialState, action: IAuthActions): IAuthReducer {
        let newState: IAuthReducer = { ...state };

        switch (action.type) {
            case AuthConstants.POST_LOGIN_REQUEST:
                newState = {
                    ...newState,
                    loading: true,
                    error: undefined
                };
                return newState;
            case AuthConstants.POST_LOGIN_SUCCESS:
                newState = {
                    ...newState,
                    loading: false,
                    token: action.token,
                    isAuthenticated: true,
                    error: undefined
                };
                return newState;
            case AuthConstants.POST_LOGIN_FAILURE:
                newState = {
                    ...newState,
                    loading: false,
                    error: action.error
                };
                return newState;
            case AuthConstants.POST_LOGOUT_REQUEST:
                newState = {
                    ...newState,
                    loading: true,
                    error: undefined
                };
                return newState;
            case AuthConstants.POST_LOGOUT_SUCCESS:
                newState = {
                    ...newState,
                    loading: false,
                    token: undefined,
                    isAuthenticated: false,
                    error: undefined
                };
                return newState;
            case AuthConstants.POST_LOGOUT_FAILURE:
                newState = {
                    ...newState,
                    loading: false,
                    error: action.error
                };
                return newState;
            default:
                return state;
        }
    }
}
