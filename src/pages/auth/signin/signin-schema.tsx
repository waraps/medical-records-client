import * as yup from 'yup';

export const signinSchema = yup.object({
    email: yup.string().label('email').email('Debe ingresar un correo valido').required('Este campo es requerido'),
    password: yup.string().label('password').min(8, 'Debe Ingresar una contrasena mas larga').required('Este campo es requerido')
});

export type signinSchemaType = yup.InferType<typeof signinSchema>
