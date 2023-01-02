import * as yup from 'yup';

export const patientSchema = yup.object({
    name: yup.string().label('name').required('Este campo es requerido'),
    specie: yup.string().label('specie').required('Este campo es requerido'),
    race: yup.string().label('race').required('Este campo es requerido'),
    birth: yup.string().label('birth').required('Este campo es requerido'),
    color: yup.string().label('color').required('Este campo es requerido'),
    sex_id: yup.number().label('sex_id').required('Este campo es requerido'),
    neutered: yup.boolean().label('neutered').required('Este campo es requerido'),
});

export type patientSchemaType = yup.InferType<typeof patientSchema>
