import { ISession } from '../interfaces/network';

export const storeCredentials = (credentials: ISession): void =>
    localStorage.setItem('credentials', JSON.stringify(credentials));

export const removeCredentials = (): void => localStorage.clear();

export const getCredentials = (): string | null =>
    localStorage.getItem('credentials');
