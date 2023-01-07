import * as yup from 'yup';

export const recordSchema = yup.object({
    reason: yup.string().label('reason'),
    revelevant_clinic: yup.string().label('reason'),
    diagnosis: yup.string().label('reason'),
    treatment: yup.string().label('reason'),
    weight: yup.number().label('reason'),
});

export type recordSchemaType = yup.InferType<typeof recordSchema>
