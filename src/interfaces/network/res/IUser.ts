export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    avatar?: string;
    email: string;
    dni: string;
    phone: string;
    rol_id: number;
    createdAt: Date;
    updateAt: Date;
}
