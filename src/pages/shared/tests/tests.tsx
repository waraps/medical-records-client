/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { useFetch, usePost } from '../../../hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ITests, ITestsReq } from '../../../interfaces';
import { testSchema, testSchemaType } from './test-schema';
import { format } from 'date-fns';

const COLUMNS: Column[] = [
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
];

export const Tests = (): JSX.Element => {
    const { loading, data: tests, fetchData } = useFetch<ITests[]>('/tests', {}, false);

    const columns = useMemo(() => COLUMNS,  []);
    const data = useMemo(() => tests?.map(test => {
        return (
            {
                id: test.id,
                name: test.name,
                createdAt: format(new Date(test.createdAt), 'dd/LL/yyyy'),
                updatedAt: format(new Date(test.createdAt), 'dd/LL/yyyy'),
            }
        );
    }), [tests]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({columns, data: data || []});

    const { loading: loadingTests, data: dataTest, doRequest } = usePost<ITests, ITestsReq>('/tests');

    const { register, handleSubmit , formState: { errors } } = useForm<testSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(testSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            name: '',
        }
    });

    const onSubmit = (schema: testSchemaType): void => {
        const test: ITestsReq = {
            name: schema.name
        };

        doRequest(test);
    };

    useEffect(() => {
        fetchData();
    }, [dataTest]);
    

    if (loading) {
        return <div>loading ...</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center md:w-11/12 lg:w-3/5 rounded overflow-hidden m-5">
                <div className="w-2/4">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Registrar nuevo examen
                    </label>
                    <input disabled={loadingTests} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="Ingresar nombre del examen" {...register('name', { required: true })} />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                </div>
                <div className="w-2/4 mt-3 ml-5">
                    <button disabled={loadingTests} type="submit" className='px-8 py-3 rounded-lg bg-primary-pruple-300 text-white'>Registrar</button>
                </div>
            </form>
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
        </>
    );  
};
