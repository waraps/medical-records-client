/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Column, useTable } from 'react-table';
import { IMedicalAppointment, IMedicalAppointmentReq, IPatient } from '../../../../interfaces';
import { format } from 'date-fns';
import { getPetSex } from '../../../../tools';
import { AppointmentStatusConstants } from '../../../../constants';
import { usePost } from '../../../../hooks';

interface IPetList {
    pets: IPatient[];
}

export const PetList = ({ pets }: IPetList) => {

    const { loading, doRequest } = usePost<IMedicalAppointment, IMedicalAppointmentReq>('/medical-appointment');

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
        {
            id: 'send',
            Header: 'Enviar a Sala',
            accessor: 'send',
            Cell: ({ row }: any) => {
                const {patient_id, status} = row.original.send;
                return (
                    <button 
                        disabled={loading} 
                        className='px-3 py-3 rounded-lg bg-primary-pruple-300 text-white flex justify-center items-center text-center' 
                        onClick={() => doRequest({patient_id, status})}
                    >
                        {loading ?
                            <svg
                                aria-hidden="true"
                                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-primary-pruple-500"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                ></path>
                            </svg> 
                            : 'Enviar'}
                    </button>
                );
            }
        },
    ];

    const columns = useMemo(() => COLUMNS,  []);
    const data = useMemo(() => pets?.map(pet => {
        return (
            {
                id: pet.id,
                avatar: pet.avatar,
                name: pet.name,
                sex_id: getPetSex(pet.sex_id),
                race: pet.race,
                specie: pet.specie,
                color: pet.color,
                birth: format(new Date(pet.birth), 'dd/LL/yyyy'),
                neutered: pet.neutered ? 'Si' : 'No',
                created_by: `${pet.user.first_name} ${pet.user.last_name}`,
                createdAt: format(new Date(pet.createdAt), 'dd/LL/yyyy'),
                send: {patient_id: pet.id, status: AppointmentStatusConstants.WAITING}
            }
        );
    }), []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({columns, data: data || []});

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