import * as yup from 'yup';

export const ownerSchema = yup.object({
    first_name: yup.string().label('first_name').required('Este campo es requerido'),
    last_name: yup.string().label('last_name').required('Este campo es requerido'),
    dni: yup.string().label('dni').required('Este campo es requerido'),
    phone: yup.string().label('phone').required('Este campo es requerido'),
    address: yup.string().label('address').required('Este campo es requerido'),
    email: yup.string().label('email').email('Debe ingresar un correo valido').required('Este campo es requerido'),
    occupation: yup.string().label('occupation').required('Este campo es requerido'),
    housing: yup.string().label('housing').required('Este campo es requerido'),
    other_pets: yup.boolean().label('other_pets').required('Este campo es requerido'),
});

export type ownerSchemaType = yup.InferType<typeof ownerSchema>
