import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { getCredentials, removeCredentials, storeCredentials } from '../lib';
import { IError, ISession } from '../interfaces';

let _retry = false;

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
        config.headers = config.headers;

        const credentials: string | null = getCredentials();
        const userCredentials = credentials?.length ? (JSON.parse(credentials) as ISession) : undefined;
        const token = userCredentials?.token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return await Promise.resolve(config);
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError<IError>) => {
    // save original request
        const originalRequest = error.config;

        let apiError: IError = {
            message: 'Ooops! Algo esta mal o tu usuario no esta autorizado',
        };

        // UnauthorizedError
        if (error.response?.status === 401 && !_retry) {
            _retry = true;
            const storedCredentials = getCredentials();
            const credentials = storedCredentials && storedCredentials.length ? (JSON.parse(storedCredentials)) : undefined;
            if (credentials && originalRequest && originalRequest?.headers) {
                try {
                    const { refresh_token: refreshToken } = credentials;
                    if (refreshToken) {
                        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/refresh`, {}, {
                            headers: {
                                'Authorization': `Bearer ${refreshToken}`
                            }
                        });
                        const { access_token, refresh_token, rol } = response.data;
                        const session: ISession = {
                            token: access_token,
                            refresh_token,
                            rol,
                            isAuthenticated: true,
                        };
                        storeCredentials(session);

                        originalRequest.headers.Authorization = `Bearer ${access_token}`;
                        return API(originalRequest);
                    }

                } catch (_error) {
                    removeCredentials();
                    window.location.replace('/signin');
                    return Promise.reject(_error);
                }
            }
        }

        if(error.response && error.response.data && error.response.data.message) {
            if(error.response?.status === 403 && error.response.data.message === 'Credentials incorrect') {
                apiError = {
                    message: 'Credenciales incorrectas',
                };
            } else {
                apiError = {
                    message: error.response.data.message,
                };
            }
        }

        return await Promise.reject(apiError);
    }
);

export { API };
