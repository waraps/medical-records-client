import * as yup from 'yup';

export const searchOwnerSchema = yup.object({
    dni: yup.string().label('dni').required('Este campo es requerido'),
});

export type searchOwnerSchemaType = yup.InferType<typeof searchOwnerSchema>
