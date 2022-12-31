import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '../../../components';
import { Heading, useToast } from '@chakra-ui/react';
import { useFetch } from '../../../hooks';
import { format } from 'date-fns';
import { Column } from 'react-table';
import { IPatient } from '../../../interfaces';
import { getPetSex } from '../../../tools';

interface IPatientsList {
    id: number;
    avatar: string;
    name: string;
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
    const { fetchData, loading, error, data: patients} = useFetch<IPatient[]>('/patients', undefined, false);
    const [data, setData] = useState<IPatientsList[]>([]);
    const toast = useToast();

    useEffect(() => fetchData(), []);

    useEffect(() => {
        if(patients) {
            const formattedPatient: IPatientsList[] = patients?.map(patient => {
                return {
                    id: patient.id,
                    avatar: patient.avatar,
                    name: patient.name,
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
            id: 'sex_id',
            Header: 'Sexo',
            accessor: 'sex_id'
        },
        {
            id: 'race',
            Header: 'Raza',
            accessor: 'race'
        },
        {
            id: 'specie',
            Header: 'Especie',
            accessor: 'specie'
        },
        {
            id: 'color',
            Header: 'color',
            accessor: 'color'
        },
        {
            id: 'birth',
            Header: 'Nacimiento',
            accessor: 'birth'
        },
        {
            id: 'created_by',
            Header: 'Registrado por',
            accessor: 'created_by'
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
                Pacientes
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
