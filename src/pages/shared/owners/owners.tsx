import React, { useEffect, useMemo, useState } from 'react';
import { Button, Heading, useToast } from '@chakra-ui/react';
import { DataTable } from '../../../components';
import { CellProps, Column } from 'react-table';
import { format } from 'date-fns';
import { useFetch } from '../../../hooks';
import { IOwner } from '../../../interfaces/network/res/IOwner';
import { useNavigate } from 'react-router-dom';

interface IOwnerList {
    id: number;
    first_name: string;
    last_name: string;
    dni: string;
    phone: string;
    address: string;
    email: string;
    occupation: string;
    housing: string;
    other_pets: string;
    avatar: string;
    createdAt: string;
}

export const Owners = (): JSX.Element => {
    const { fetchData, loading, error, data: owners} = useFetch<IOwner[]>('/owners', undefined, false);
    const [data, setData] = useState<IOwnerList[]>([]);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => fetchData(), []);

    useEffect(() => {
        if(owners) {
            const formattedOwners: IOwnerList[] = owners?.map(owner => {
                return {
                    id: owner.id,
                    first_name: owner.first_name,
                    last_name: owner.last_name,
                    dni: owner.dni,
                    phone: owner.phone,
                    address: owner.address,
                    email: owner.email,
                    occupation: owner.occupation,
                    housing: owner.housing,
                    other_pets: owner.other_pets ? 'Si' : 'No',
                    avatar: owner.avatar,
                    createdAt: format(new Date(owner.createdAt), 'dd/LL/yyyy'),
                };
            }) || [];

            setData(formattedOwners);
        }
    }, [owners]);

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

    const columns = useMemo<Column<IOwnerList>[]>(() => [
        {
            id: 'first_name',
            Header: 'Nombre',
            accessor: 'first_name'
        },
        {
            id: 'last_name',
            Header: 'Apellido',
            accessor: 'last_name'
        },
        {
            id: 'dni',
            Header: 'C.I',
            accessor: 'dni'
        },
        {
            id: 'phone',
            Header: 'Telefono',
            accessor: 'phone'
        },
        {
            id: 'email',
            Header: 'Email',
            accessor: 'email'
        },
        {
            id: 'createdAt',
            Header: 'Registrado',
            accessor: 'createdAt'
        },
        {
            id: 'details',
            Header: 'Detalles',
            accessor: 'id',
            Cell: ({ value }: CellProps<IOwnerList>) => {
                return (
                    <Button
                        bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}
                        variant={'outline'}
                        size={'sm'}
                        onClick={() => navigate(`/propietario/${value}`)}>
                        Ver Detalles
                    </Button>
                );
            },
            disableSortBy: true,
        },
    ],  []);

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Propietarios
            </Heading>
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                searchTitle={'Buscar propietario'}
            />
        </>
    );
};
