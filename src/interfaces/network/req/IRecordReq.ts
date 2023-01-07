export interface IRecordReq {
    patient_id: number;
    appointment_id: number;
    reason?: string;
    revelevant_clinic?: string;
    diagnosis?: string;
    treatment?: string;
    weight?: number;
    tests?: number[];
}

