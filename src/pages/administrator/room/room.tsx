import { Heading, useToast } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '../../../components';
import { Column } from 'react-table';
import { useFetch } from '../../../hooks';
import { format } from 'date-fns';
import { IAppointment } from '../../../interfaces';
import { getAppointmentStatus } from '../../../tools';

interface IRoom {
    id: number;
    status: string;
    patient_id: number;
    patient: string;
    user_id: number;
    user: string;
    createdAt: string;
    updatedAt: string;
}

export const Room = (): JSX.Element => {
    const { fetchData, loading, error, data: appointments} = useFetch<IAppointment[]>('/medical-appointment', undefined, false);
    const [data, setData] = useState<IRoom[]>([]);
    const toast = useToast();

    useEffect(() => fetchData(), []);

    useEffect(() => {
        if(appointments) {
            const formattedAppointment: IRoom[] = appointments?.map(appointment => {
                return {
                    id: appointment.id,
                    patient_id: appointment.patient_id,
                    patient: appointment.patient.name,
                    status: getAppointmentStatus(appointment.status),
                    user_id: appointment.user_id,
                    user: appointment.user ? `${appointment.user.first_name} ${appointment.user.last_name}` : 'Libre',
                    createdAt: format(new Date(appointment.createdAt), 'dd/LL/yyyy'),
                    updatedAt: format(new Date(appointment.createdAt), 'dd/LL/yyyy'),
                };
            }) || [];

            setData(formattedAppointment);
        }
    }, [appointments]);

    useEffect(() => {
        if (!loading && Boolean(error)) {
            toast({
                description: error?.message || 'Ha ocurrido un error',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loading]);

    const columns = useMemo<Column<IRoom>[]>(() => [
        {
            id: 'id',
            Header: 'Nro Historia',
            accessor: 'id'
        },
        {
            id: 'patient',
            Header: 'Paciente',
            accessor: 'patient'
        },
        {
            id: 'user',
            Header: 'Asignado a',
            accessor: 'user'
        },
        {
            id: 'status',
            Header: 'Estado',
            accessor: 'status'
        },
        {
            id: 'createdAt',
            Header: 'Paciente desde',
            accessor: 'createdAt'
        },
    ],  []);

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Sala de Espera
            </Heading>
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                searchTitle={'Buscar paciente'}
            />
        </>
    );
};
