import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '../../../components';
import { Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { useFetch } from '../../../hooks';
import { format } from 'date-fns';
import { CellProps, Column } from 'react-table';
import { IPatient } from '../../../interfaces';
import { getPetSex } from '../../../tools';
import { useNavigate } from 'react-router-dom';
import { FaDog } from 'react-icons/fa';
import { useAppSelector } from '../../../state/hooks';
import { ProfileConstants } from '../../../constants';

interface IPatientsList {
    id: number;
    avatar: string;
    name: string;
    owner: string;
    sex_id: string;
    race: string;
    specie: string;
    color: string;
    birth: string;
    neutered: string;
    created_by: string;
    createdAt: string;
}

export const Patients = (): JSX.Element => {
    const { user } = useAppSelector(state => state.user);
    const { fetchData, loading, error, data: patients} = useFetch<IPatient[]>('/patients', undefined, false);
    const [data, setData] = useState<IPatientsList[]>([]);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => fetchData(), []);

    useEffect(() => {
        if(patients) {
            const formattedPatient: IPatientsList[] = patients?.map(patient => {
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
                };
            }) || [];

            setData(formattedPatient);
        }
    }, [patients]);

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

    const columns = useMemo<Column<IPatientsList>[]>(() => [
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
            id: 'owner',
            Header: 'Dueño',
            accessor: 'owner'
        },
        {
            id: 'createdAt',
            Header: 'Paciente desde',
            accessor: 'createdAt'
        },
        {
            id: 'created_by',
            Header: 'Registrado por',
            accessor: 'created_by'
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
    ],  []);

    return (
        <>
            <Flex justifyContent={'space-between'}>
                <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                    Pacientes
                </Heading>
                {
                    user?.rol_id === ProfileConstants.RECEPTIONIST &&
                    <Button
                        rightIcon={<FaDog />} bg={'secondary.400'} color={'white'}
                        _hover={{bg: 'secondary.600'}} onClick={() => navigate('/paciente/nuevo')}
                    >
                        Nuevo
                    </Button>
                }
            </Flex>
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                searchTitle={'Buscar paciente'}
            />
        </>
    );
};
