import * as yup from 'yup';

export const findOwnerSchema = yup.object({
    dni: yup.string().label('dni').required('Este campo es requerido'),
});

export type findOwnerSchemaType = yup.InferType<typeof findOwnerSchema>