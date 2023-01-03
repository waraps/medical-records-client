import React, { useEffect, useMemo, useState } from 'react';
import { Button, Flex, Heading, useToast } from '@chakra-ui/react';

import { CellProps, Column, } from 'react-table';
import { useFetch } from '../../../hooks';
import { IUser } from '../../../interfaces';
import { format } from 'date-fns';
import { DataTable } from '../../../components';
import { userType } from '../../../tools';
import { useNavigate } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';

interface IUsersTable {
    id: number;
    first_name: string;
    last_name: string;
    avatar?: string;
    email: string;
    createdAt: string;
    updateAt: Date;
    dni: string;
    user_type: string;
}

export const Users = (): JSX.Element => {
    const { fetchData, loading, error, data: users} = useFetch<IUser[]>('/users', undefined, false);
    const [data, setData] = useState<IUsersTable[]>([]);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => fetchData(), []);

    useEffect(() => {
        if(users) {
            const formattedUsers: IUsersTable[] = users?.map(user => {
                return {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    avatar: user.avatar,
                    email: user.email,
                    createdAt: format(new Date(user.createdAt), 'dd/LL/yyyy'),
                    updateAt: user.updateAt,
                    dni: user.dni,
                    user_type: userType(user.rol_id)
                };
            }) || [];

            setData(formattedUsers);
        }
    }, [users]);

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


    const columns = useMemo<Column<IUsersTable>[]>(() => [
        {
            id: 'id',
            Header: 'Id',
            accessor: 'id'
        },
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
            Header: 'CI',
            accessor: 'dni'
        },
        {
            id: 'email',
            Header: 'Correo',
            accessor: 'email'
        },
        {
            id: 'Tipo',
            Header: 'Tipo',
            accessor: 'user_type'
        },
        {
            Header: 'Registrado',
            accessor: 'createdAt'
        },
        {
            id: 'details',
            Header: 'Detalles',
            accessor: 'id',
            Cell: ({ value }: CellProps<IUsersTable>) => {
                return (
                    <Button
                        bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}
                        variant={'outline'}
                        size={'sm'}
                        onClick={() => navigate(`/usuario/${value}`)}>
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
                    Usuarios
                </Heading>
                <Button rightIcon={<FiUserPlus />} bg={'secondary.400'} color={'white'} _hover={{bg: 'secondary.600'}} onClick={() => navigate('/usuario/nuevo')}>
                    Nuevo
                </Button>
            </Flex>
            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                searchTitle={'Buscar usuario'}
            />
        </>
    );
};
