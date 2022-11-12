import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().label('email').email('Debe ingresar un correo valido').required('Este campo es requerido'),
    password: yup.string().label('password').required('Este campo es requerido')
});

export type loginSchemaType = yup.InferType<typeof loginSchema>
