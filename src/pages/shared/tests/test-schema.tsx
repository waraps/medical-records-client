import * as yup from 'yup';

export const testSchema = yup.object({
    name: yup.string().label('name').required('Este campo es requerido'),
});

export type testSchemaType = yup.InferType<typeof testSchema>