import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { store } from '../redux/store';
import { AuthActions } from '../redux/auth';
import { getCredentials, removeCredentials, storeCredentials } from '../lib';
import { ISession } from '../interfaces';
import { IError } from '../interfaces/generic';

let isRefreshing = false;
const refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void): number => refreshSubscribers.push(cb);
const onRefreshed = (token: string): void => refreshSubscribers.forEach((cb) => cb(token));

const API: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        'Content-Type': 'application/json'
    }
});

API.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        config.headers = config.headers ?? {};

        const credentials: string | null = getCredentials();
        const userCredentials = credentials?.length ? (JSON.parse(credentials) as ISession) : undefined;
        const token = userCredentials?.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return await Promise.resolve(config);
    },
    () => {
    //
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError<IError>) => {
    // save original request
        const originalRequest = error.config;

        // UnauthorizedError
        if (error.response?.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;

                const storedCredentials = getCredentials();
                const credentials =
          storedCredentials && storedCredentials.length
              ? (JSON.parse(storedCredentials) as ISession)
              : undefined;

                if (process.env.REACT_APP_BASE_URL && credentials && originalRequest && originalRequest.headers) {
                    try {
                        const response: Response = await fetch(
                            `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${credentials.refresh_token}`
                                }
                                // body: undefined,
                            }
                        );
                        const { access_token: accessToken, refresh_token: refreshToken } = await response.json();
                        const session = {
                            token: accessToken,
                            refresh_token: refreshToken,
                            isAuthenticated: true
                        };
                        storeCredentials(session);
                        onRefreshed(session.token);
                    } catch (error) {
                        removeCredentials();
                        // reset reducers state
                        store.dispatch(AuthActions.resetStateLogout());
                    }
                    isRefreshing = false;
                }
            }

            return await new Promise((resolve) => {
                subscribeTokenRefresh((token: string): void => {
                    // replace token
                    if (originalRequest?.headers != null) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return resolve(axios(originalRequest));
                    } else {
                        return resolve(null);
                    }
                });
            });
        }

        let apiError: IError = {
            message: 'Ooops! Something is wrong or your user is not authorized'
        };

        if (
            error.response?.status === 403 &&
      error.response.data.message === 'Credentials incorrect'
        ) {
            const message = 'Credenciales incorrectas';
            apiError = {
                message
            };
        }

        return await Promise.reject(apiError);
    }
);

export default API;
