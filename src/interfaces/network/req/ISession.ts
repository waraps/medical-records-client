export interface ISession {
    token: string;
    refresh_token: string;
    rol: number;
    isAuthenticated: boolean;
}
