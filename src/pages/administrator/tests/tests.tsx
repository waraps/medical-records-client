import { Heading, useToast } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '../../../components';
import { useFetch } from '../../../hooks';
import { Column } from 'react-table';
import { format } from 'date-fns';
import { ITests } from '../../../interfaces';

interface ITestList {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export const Tests = (): JSX.Element => {
    const { fetchData, loading, error, data: tests} = useFetch<ITests[]>('/tests', undefined, false);
    const [data, setData] = useState<ITestList[]>([]);
    const toast = useToast();

    useEffect(() => fetchData(), []);

    useEffect(() => {
        if(tests) {
            const formattedTests: ITestList[] = tests?.map(test => {
                return {
                    id: test.id,
                    name: test.name,
                    createdAt: format(new Date(test.createdAt), 'dd/LL/yyyy'),
                    updatedAt: format(new Date(test.createdAt), 'dd/LL/yyyy'),
                };
            }) || [];

            setData(formattedTests);
        }
    }, [tests]);

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

    const columns = useMemo<Column<ITestList>[]>(() => [
        {
            id: 'id',
            Header: 'ID',
            accessor: 'id'
        },
        {
            id: 'name',
            Header: 'Nombre',
            accessor: 'name'
        },
        {
            id: 'createdAt',
            Header: 'Registrado',
            accessor: 'createdAt'
        },
    ],  []);

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Tipo de Exámenes
            </Heading>
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                searchTitle={'Buscar examen'}
            />
        </>
    );
};
