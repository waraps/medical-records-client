import React, { useEffect } from 'react';
import { Button, Heading, useToast } from '@chakra-ui/react';
import { useFetch, usePost } from '../../../hooks';
import { IAppointment, IOwner, IPatient } from '../../../interfaces';
import { SearchOwner, searchOwnerSchemaType } from '../patients';
import { DataTable } from '../../../components';
import { CellProps, Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { IAppointmentReq } from '../../../interfaces/network/req/IAppointmentReq';
import { AppointmentStatusConstants } from '../../../constants';

export const PatientToRoom = () => {
    const { fetchData, loading: loadingOwner, error: errorOwner, data: owner} = useFetch<IOwner>('', undefined, false);
    const { doRequest, loading, error, data } = usePost<IAppointment, IAppointmentReq>('/medical-appointment');
    const toast = useToast();
    const navigate = useNavigate();

    const onSearchOwner = (schema: searchOwnerSchemaType): void => {
        fetchData(`/owners/dni/${schema.dni}`);
    };

    useEffect(() => {
        if (!loadingOwner && Boolean(errorOwner)) {
            toast({
                description: errorOwner?.message || 'Error al cargar mascotas',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }

    }, [loadingOwner]);

    useEffect(() => {
        if (!loading && data) {
            toast({
                description: 'Paciente enviado a sala exitosamente',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
        if (!loading && Boolean(error)) {
            let message: string = error?.message || 'Error al enviar mascota a sala';
            if(error?.message === 'Patient is in an appointment already') {
                message = 'El paciente se encuentra en espera o ya esta en consulta';
            }
            toast({
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }

    }, [loading]);

    const sendPatientToRoom = (patientId: number): void => {
        doRequest({ patient_id: patientId, status: AppointmentStatusConstants.WAITING });
    };

    const columns: Column<IPatient>[] =  [
        {
            id: 'id',
            Header: 'Nro Historia',
            accessor: 'id'
        },
        {
            id: 'name',
            Header: 'Nombre',
            accessor: 'name'
        },
        {
            id: 'specie',
            Header: 'Especie',
            accessor: 'specie'
        },
        {
            id: 'race',
            Header: 'Raza',
            accessor: 'race'
        },
        {
            id: 'details',
            Header: 'Detalles',
            accessor: 'id',
            Cell: ({ value }: CellProps<IPatient>) => {
                return (
                    <Button
                        bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}
                        variant={'outline'}
                        size={'sm'}
                        disabled={loading}
                        onClick={() => navigate(`/paciente/${value}`)}>
                        Ver Detalles
                    </Button>
                );
            },
            disableSortBy: true,
        },
        {
            id: 'send',
            Header: 'Enviar a Sala',
            accessor: 'id',
            Cell: ({ value }: CellProps<IPatient>) => {
                return (
                    <Button
                        bg={'secondary.400'} color={'white'} _hover={{bg: 'secondary.500'}}
                        variant={'outline'}
                        size={'sm'}
                        onClick={() => sendPatientToRoom(value)}>
                        Enviar
                    </Button>
                );
            },
            disableSortBy: true,
        },
    ];

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Enviar Paciente a Sala
            </Heading>
            <SearchOwner onSubmit={onSearchOwner} buttonTitle={'Buscar'} />
            <DataTable
                columns={columns}
                data={owner?.pets || []}
                loading={loadingOwner}
                hideSearch={true}
            />
        </>
    );
};
