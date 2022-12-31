import { useEffect, useState, useRef, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';
import { IError } from '../interfaces/generic';
import { API } from '../api';

interface IReturnProps<T> {
  loading: boolean
  data?: T
  error?: IError
}

export function useFetch<T> (
    path: string,
    configRequest?: AxiosRequestConfig,
    requestOnMount = true
): IReturnProps<T> & { fetchData: (optionalPath?: string) => void } {
    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<IError | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const isMounted = useRef<boolean>(true);

    const fetchData = useCallback(
        (optionalPath?: string): void => {
            const uri = optionalPath ?? path;
            setLoading(true);
            setError(undefined);
            setData(undefined);
            API.get<T>(uri, configRequest)
                .then((response) => {
                    if (isMounted.current) {
                        setData(response.data);
                    }
                })
                .catch((error) => {
                    if (isMounted.current) {
                        setError(error);
                    }
                })
                .finally(() => {
                    if (isMounted.current) {
                        setLoading(false);
                    }
                });
        },
        [path, configRequest, isMounted.current]
    );

    useEffect(() => {
        if (requestOnMount) {
            fetchData();
        }
    }, [path, configRequest]);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return { data, error, loading, fetchData };
}

export function usePost<T, R> (
    path: string,
    configRequest?: AxiosRequestConfig
): IReturnProps<T> & { doRequest: (data: R) => void } {
    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<IError | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const isMounted = useRef<boolean>(true);

    const doRequest = useCallback(
        (body: R): void => {
            setLoading(true);
            setError(undefined);
            setData(undefined);
            API.post<T>(path, body, configRequest)
                .then((response) => {
                    if (isMounted.current) {
                        setData(response.data);
                    }
                })
                .catch((error) => {
                    if (isMounted.current) {
                        setError(error);
                    }
                })
                .finally(() => {
                    if (isMounted.current) {
                        setLoading(false);
                    }
                });
        },
        [path, configRequest, isMounted.current]
    );

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return { data, error, loading, doRequest };
}

export function usePut<T, R> (
    path: string,
    configRequest?: AxiosRequestConfig
): IReturnProps<T> & { doUpdate: (data: R) => void } {
    const [data, setData] = useState<T | undefined>(undefined);
    const [error, setError] = useState<IError | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const isMounted = useRef<boolean>(true);

    const doUpdate = useCallback(
        (body: R): void => {
            setLoading(true);
            setError(undefined);
            setData(undefined);
            API.put<T>(path, body, configRequest)
                .then((response) => {
                    if (isMounted.current) {
                        setData(response.data);
                    }
                })
                .catch((error) => {
                    if (isMounted.current) {
                        setError(error);
                    }
                })
                .finally(() => {
                    if (isMounted.current) {
                        setLoading(false);
                    }
                });
        },
        [path, configRequest, isMounted.current]
    );

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return { data, error, loading, doUpdate };
}
