/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { useFetch } from '../../../hooks';
import { IMedicalAppointment } from '../../../interfaces';
import { format } from 'date-fns';
import { getAppointmentStatus } from '../../../tools';


const COLUMNS: Column[] = [
    {
        id: 'id',
        Header: 'Nro Historia',
        accessor: 'id'
    },
    {
        id: 'patient',
        Header: 'Paciente',
        accessor: 'patient'
    },
    {
        id: 'user',
        Header: 'Asignado a',
        accessor: 'user'
    },
    {
        id: 'status',
        Header: 'Estado',
        accessor: 'status'
    },
    {
        id: 'createdAt',
        Header: 'Registrado',
        accessor: 'createdAt'
    },
];

const WaitingRoom = (): JSX.Element => {
    const { loading, data: appointments } = useFetch<IMedicalAppointment[]>('/medical-appointment');

    const columns = useMemo(() => COLUMNS,  []);
    const data = useMemo(() => appointments?.map(appointment => {
        return (
            {
                id: appointment.id,
                patient_id: appointment.patient_id,
                patient: appointment.patient.name,
                status: getAppointmentStatus(appointment.status),
                user_id: appointment.user_id,
                user: appointment.user ? appointment.user.first_name : 'Nadie',
                createdAt: format(new Date(appointment.createdAt), 'dd/LL/yyyy'),
                updatedAt: format(new Date(appointment.createdAt), 'dd/LL/yyyy'),
            }
        );
    }), [appointments]);

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

export { WaitingRoom };
