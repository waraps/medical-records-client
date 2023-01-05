import { Badge, Heading, useToast } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '../../../components';
import { CellProps, Column } from 'react-table';
import { useFetch } from '../../../hooks';
import { format } from 'date-fns';
import { IAppointment, IRoom } from '../../../interfaces';
import { getAppointmentStatus } from '../../../tools';

export const ReceptionistMain = (): JSX.Element => {
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
                    doctor_id: appointment.doctor_id,
                    doctor: appointment.doctor ? `${appointment.doctor.first_name} ${appointment.doctor.last_name}` : 'Libre',
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

    const statusColor = (status: string): string => {
        switch (status) {
            case 'En espera':
                return 'orange.300';
            case 'En consulta':
                return 'primary.300';
            case 'Finalizada':
                return 'secondary.300';
            default:
                return '';
        }
    };

    const columns = useMemo<Column<IRoom>[]>(() => [
        {
            id: 'patient_id',
            Header: 'Nro Historia',
            accessor: 'patient_id'
        },
        {
            id: 'patient',
            Header: 'Paciente',
            accessor: 'patient'
        },
        {
            id: 'doctor',
            Header: 'Asignado a',
            accessor: 'doctor'
        },
        {
            id: 'status',
            Header: 'Estado',
            accessor: 'status',
            Cell: ({ value }: CellProps<IRoom>) => {
                return (
                    <Badge borderRadius={'md'} backgroundColor={statusColor(value)} variant='solid'>
                        {value}
                    </Badge>
                );
            },
        },
        {
            id: 'createdAt',
            Header: 'Paciente desde',
            accessor: 'createdAt'
        },
    ],  []);

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'}>
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
