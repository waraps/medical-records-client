/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { useFetch } from '../../../hooks';
import { Link } from 'react-router-dom';
import { IOwner } from '../../../interfaces';
import { format } from 'date-fns';

const COLUMNS: Column[] = [
    {
        id: 'avatar',
        Header: 'Perfil',
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
        Header: 'C.I',
        accessor: 'dni'
    },
    {
        id: 'phone',
        Header: 'Telefono',
        accessor: 'phone'
    },
    {
        id: 'address',
        Header: 'Direccion',
        accessor: 'address'
    },
    {
        id: 'email',
        Header: 'color',
        accessor: 'email'
    },
    {
        id: 'occupation',
        Header: 'Ocupacion',
        accessor: 'occupation'
    },
    {
        id: 'housing',
        Header: 'Tipo de Vivienda',
        accessor: 'housing'
    },
    {
        id: 'other_pets',
        Header: 'Mas de una mascota',
        accessor: 'other_pets'
    },
    {
        id: 'createdAt',
        Header: 'Registrado',
        accessor: 'createdAt'
    },
];

export const Owners = (): JSX.Element => {
    const { loading, data: owners } = useFetch<IOwner[]>('/owners');

    const columns = useMemo(() => COLUMNS,  []);
    const data = useMemo(() => owners?.map(owner => {
        return (
            {
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
            }
        );
    }), [owners]);

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
