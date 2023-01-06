import React, { useEffect, useState } from 'react';
import { Button, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import { useFetch } from '../../../hooks';
import { IOwner, IPatient, IPatientsList } from '../../../interfaces';
import { SearchOwner, searchOwnerSchemaType } from '../patients';
import { DataTable } from '../../../components';
import { CellProps, Column } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { AlertAssignToDoctor } from './assign-to-doctor-modal';
import { format } from 'date-fns';
import { getPetSex } from '../../../tools';

export const PatientToRoom = () => {
    const { fetchData, loading: loadingOwner, error: errorOwner, data: owner} = useFetch<IOwner>('', undefined, false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const [pets, setPets] = useState<IPatientsList[]>([]);
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

    useEffect(() => {
        if(owner && owner.pets) {
            const formattedPatient: IPatientsList[] = owner.pets.map(patient => {
                return {
                    id: patient.id,
                    avatar: patient.avatar,
                    name: patient.name,
                    owner: `${patient.owner.first_name} ${patient.owner.last_name}`,
                    sex_id: getPetSex(patient.sex_id),
                    race: patient.race,
                    specie: patient.specie,
                    color: patient.color,
                    birth: format(new Date(patient.birth), 'dd/LL/yyyy'),
                    neutered: patient.neutered ? 'Si' : 'No',
                    created_by: `${patient.user.first_name} ${patient.user.last_name}`,
                    createdAt: format(new Date(patient.createdAt), 'dd/LL/yyyy'),
                    patient: patient,
                };
            }) || [];

            setPets(formattedPatient);
        }
    }, [owner?.pets]);

    const columns: Column<IPatientsList>[] =  [
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
            Cell: ({ value }: CellProps<IPatientsList>) => {
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
            accessor: (row) => row.patient,
            Cell: ({ value }: { value: IPatient }) => {
                return (
                    <Button
                        bg={'secondary.400'} color={'white'} _hover={{bg: 'secondary.500'}}
                        variant={'outline'}
                        size={'sm'}
                        disabled={value.in_room}
                        onClick={() => {
                            setSelectedPatient(value.id);
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
                data={pets || []}
                loading={loadingOwner}
                hideSearch={true}
            />
            <AlertAssignToDoctor isOpen={isOpen} onClose={onClose} patient={selectedPatient} />
        </>
    );
};
