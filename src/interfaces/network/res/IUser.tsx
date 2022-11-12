export interface IUser {
  id: number
  first_name: string
  last_name: string
  avatar: string
  email?: string
  createdAt: Date
  updateAt: Date
  dni: string
  rol_id: number
}
