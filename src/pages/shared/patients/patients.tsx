/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { useFetch } from '../../../hooks';
import { Link } from 'react-router-dom';
import { IPatient } from '../../../interfaces';
import { format } from 'date-fns';
import { getPetSex } from '../../../tools';

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
        Header: 'Registrado',
        accessor: 'createdAt'
    },
];

export const Patients = (): JSX.Element => {
    const { loading, data: patients } = useFetch<IPatient[]>('/patients');

    const columns = useMemo(() => COLUMNS,  []);
    const data = useMemo(() => patients?.map(patient => {
        return (
            {
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
            }
        );
    }), [patients]);

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
