import * as yup from 'yup';

export const userSchema = yup.object({
    first_name: yup.string().label('first_name').required('Este campo es requerido'),
    last_name: yup.string().label('last_name').required('Este campo es requerido'),
    dni: yup.string().label('dni').required('Este campo es requerido'),
    email: yup.string().label('email').email('Debe ingresar un correo valido').required('Este campo es requerido'),
    rol_id: yup.number().label('rol_id').required('Este campo es requerido'),
});

export type userSchemaType = yup.InferType<typeof userSchema>
