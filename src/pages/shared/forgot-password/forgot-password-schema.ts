import * as yup from 'yup';

export const forgotPasswordSchema = yup.object({
    email: yup.string().label('email').email('Debe ingresar un correo valido').required('Este campo es requerido'),
});

export type forgotPasswordSchemaType = yup.InferType<typeof forgotPasswordSchema>
