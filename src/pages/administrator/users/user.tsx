/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Column, useTable } from 'react-table';
import { useFetch } from '../../../hooks';
import { IUser } from '../../../interfaces';

import { format } from 'date-fns';

const COLUMNS: Column[] = [
    {
        id: 'id',
        Header: '#',
        accessor: 'id'
    },
    {
        id: 'avatar',
        Header: '#',
        accessor: 'avatar',
        Cell: ({ row }: any) => (
            <Link to='#'>
                <div className='flex justify-center items-center cursor-pointer h-8 w-8 rounded-full border-solid ring-2 ring-primary-green-400 p-0.5'>
                    <img
                        src={row.original.avatar}
                        alt="avatar"
                    />
                </div>
            </Link>
        )
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
        Header: 'Registrado',
        accessor: 'createdAt'
    },
];

const User = (): JSX.Element => {
    const { loading, data: users, fetchData: fetchUsers } = useFetch<IUser[]>('/users', {}, false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = useMemo(() => COLUMNS,  []);
    const data = useMemo(() => users?.map(user => {
        return (
            {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                avatar: user.avatar,
                email: user.email,
                createdAt: format(new Date(user.createdAt), 'dd/LL/yyyy'),
                updateAt: user.updateAt,
                dni: user.dni,
                rol_id: user.rol_id
            }
        );
    }), [users]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({columns, data: data || []});

    if (loading) {
        return <div>loading ...</div>;
    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden ">
                        <table 
                            {...getTableProps()} 
                            className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700"
                        >
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                {
                                    headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getFooterGroupProps()}>
                                            {
                                                headerGroup.headers.map(column => (
                                                    <th scope="col"
                                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400" 
                                                        {...column.getHeaderProps()}
                                                    >
                                                        {column.render('Header')}
                                                    </th>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </thead>
                            <tbody {...getTableBodyProps()} 
                                className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            >
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" {...row.getRowProps()}>
                                            {
                                                row.cells.map(cell => {
                                                    return (
                                                        <td 
                                                            className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white" 
                                                            {...cell.getCellProps()}
                                                        >
                                                            {cell.render('Cell')}
                                                        </td>
                                                    );
                                                })
                                            }
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );  
};

export { User };
