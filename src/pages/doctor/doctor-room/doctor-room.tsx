import React, { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Heading, useToast, Text } from '@chakra-ui/react';
import { DataTable } from '../../../components';
import { CellProps, Column } from 'react-table';
import { useFetch, usePost } from '../../../hooks';
import { format } from 'date-fns';
import { IAppointment, IRecord, IRecordReq, IRoom } from '../../../interfaces';
import { getAppointmentStatus } from '../../../tools';
import { AppointmentStatusConstants } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { me } from '../../../state/user';
import { currentAppointment } from '../../../state/appointment';

export const DoctorRoom = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector(state => state.user);

    const { loading: loadingRecord, data: record, doRequest, error: errorRecord } = usePost<IRecord, IRecordReq>('/records');
    const { fetchData, loading, error, data: appointments} = useFetch<IAppointment[]>('/medical-appointment/me', undefined, false);
    const [data, setData] = useState<IRoom[]>([]);
    const toast = useToast();
    const navigate = useNavigate();

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
                    doctor: appointment.doctor,
                    createdAt: format(new Date(appointment.createdAt), 'dd/LL/yyyy'),
                    updatedAt: format(new Date(appointment.createdAt), 'dd/LL/yyyy'),
                    appointment: appointment
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

    const startAppointment = (data: IRoom): void => {
        doRequest({
            patient_id: data.patient_id,
            appointment_id: data.id
        });
    };

    useEffect(() => {
        if (!loadingRecord && record) {
            toast({
                description: 'La consulta ha  empezado',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
            dispatch(me());
            dispatch(currentAppointment());
            navigate('/consulta');
        }
        if (!loadingRecord && Boolean(errorRecord)) {
            toast({
                description: errorRecord?.message || 'Error comenzando consulta',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loadingRecord]);

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

    const buttonStart = (value: IRoom): JSX.Element => {
        return (
            <Button
                bg={'primary.400'}
                color={'white'}
                _hover={{bg: 'primary.500'}}
                variant={'outline'}
                size={'sm'}
                minW={'100px'}
                disabled={!user?.openToAppointment}
                isLoading={loadingRecord}
                onClick={() => startAppointment(value)}>
                Comenzar
            </Button>
        );
    };

    const buttonShow = (): JSX.Element => {
        return (
            <Button
                bg={'secondary.400'}
                color={'white'}
                _hover={{bg: 'secondary.500'}}
                variant={'outline'}
                size={'sm'}
                minW={'100px'}
                isLoading={loadingRecord}
                onClick={() => navigate('/consulta')}>
                Ir
            </Button>
        );
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
            accessor: (row) => row.doctor,
            Cell: ({ value }: CellProps<IRoom>) => {
                return (
                    <Text>
                        {value ? `${value.first_name} ${value.last_name}` : 'Libre'}
                    </Text>
                );
            },
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
        {
            id: 'record',
            Header: 'Consulta',
            accessor: (row) => row.appointment,
            Cell: ({ value }: { value: IRoom })  => {
                const inProgress = value.status === AppointmentStatusConstants.IN_PROGRESS;
                return inProgress ? buttonShow() : buttonStart(value);
            },
            disableSortBy: true,
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
