import * as yup from 'yup';

export const addOwnerPetSchema = yup.object({
    //owner
    first_name: yup.string().label('first_name').required('Este campo es requerido'),
    last_name: yup.string().label('last_name').required('Este campo es requerido'),
    dni: yup.string().label('dni').required('Este campo es requerido'),
    phone: yup.string().label('phone').required('Este campo es requerido'),
    address: yup.string().label('address').required('Este campo es requerido'),
    email: yup.string().label('email').email('Debe ingresar un correo valido').required('Este campo es requerido'),
    occupation: yup.string().label('occupation').required('Este campo es requerido'),
    housing: yup.string().label('housing').required('Este campo es requerido'),
    other_pets: yup.boolean().label('other_pets').required('Este campo es requerido'),
    // pet
    specie: yup.string().label('specie').required('Este campo es requerido'),
    race: yup.string().label('race').required('Este campo es requerido'),
    name: yup.string().label('name').required('Este campo es requerido'),
    birth: yup.date().label('birth').required('Este campo es requerido'),
    color: yup.string().label('color').required('Este campo es requerido'),
    sex_id: yup.number().label('sex_id').required('Este campo es requerido'),
    neutered: yup.boolean().label('neutered').required('Este campo es requerido'),
});

export type addOwnerPetSchemaType = yup.InferType<typeof addOwnerPetSchema>

export const addPatientSchema = yup.object({
    specie: yup.string().label('specie').required('Este campo es requerido'),
    race: yup.string().label('race').required('Este campo es requerido'),
    name: yup.string().label('name').required('Este campo es requerido'),
    birth: yup.date().label('birth').required('Este campo es requerido'),
    color: yup.string().label('color').required('Este campo es requerido'),
    sex_id: yup.number().label('sex_id').required('Este campo es requerido'),
    neutered: yup.boolean().label('neutered').required('Este campo es requerido'),
});

export type addPatientSchemaType = yup.InferType<typeof addPatientSchema>

export const findOwnerSchema = yup.object({
    dni: yup.string().label('dni').required('Este campo es requerido'),
});

export type findOwnerSchemaType = yup.InferType<typeof findOwnerSchema>
