import * as yup from 'yup';

export const passwordSchema = yup.object({
    currentPassword: yup.string().label('password').min(8, 'La longitud de la contraseña al menos debe ser de 8 caracteres').required('Este campo es requerido'),
    newPassword: yup.string().label('password').min(8, 'La longitud de la contraseña al menos debe ser de 8 caracteres').required('Este campo es requerido'),
    repeatNewPassword: yup.string().label('password').min(8, 'La longitud de la contraseña al menos debe ser de 8 caracteres').required('Este campo es requerido')
});

export type passwordSchemaType = yup.InferType<typeof passwordSchema>
