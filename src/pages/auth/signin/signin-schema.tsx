import * as yup from 'yup';

export const signinSchema = yup.object({
    email: yup.string().label('email').email('Debe ingresar un correo valido').required('Este campo es requerido'),
    password: yup.string().label('password').min(8, 'La longitud de la contraseña al menos debe ser de 8 caracteres').required('Este campo es requerido')
});

export type signinSchemaType = yup.InferType<typeof signinSchema>
