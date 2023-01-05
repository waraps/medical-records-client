import React, { useEffect, useState } from 'react';
import { Button, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import { useFetch } from '../../../hooks';
import { IOwner, IPatient } from '../../../interfaces';
import { SearchOwner, searchOwnerSchemaType } from '../patients';
import { DataTable } from '../../../components';
import { CellProps, Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { AlertAssignToDoctor } from './assign-to-doctor-modal';

export const PatientToRoom = () => {
    const { fetchData, loading: loadingOwner, error: errorOwner, data: owner} = useFetch<IOwner>('', undefined, false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const [selectedPatient, setSelectedPatient] = useState<number>(0);

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
                        onClick={() => {
                            setSelectedPatient(value);
                            onOpen();
                        }}>
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
            <AlertAssignToDoctor isOpen={isOpen} onClose={onClose} patient={selectedPatient} />
        </>
    );
};
