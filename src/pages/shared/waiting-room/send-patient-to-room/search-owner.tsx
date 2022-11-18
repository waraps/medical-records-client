import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetch } from '../../../../hooks';
import { IOwner } from '../../../../interfaces';
import { findOwnerSchema, findOwnerSchemaType } from './owner-schema';
import { format } from 'date-fns';
import { PetList } from './pet-list';

export const SearchOwner = () => {
    const {loading, data, fetchData } = useFetch<IOwner>('', {}, false);

    const { register, handleSubmit, formState: { errors } } = useForm<findOwnerSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(findOwnerSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            dni: '',
        }
    });

    const onSubmit = (schema: findOwnerSchemaType): void => {
        fetchData(`/owners/dni/${schema.dni}`);
    };

    return (
        <section className='w-full'>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex items-center mb-5'}>
                <div className='sm:w-full w-2/6'>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Buscar Propietario
                    </label>
                    <input type="text" {...register('dni')} 
                        disabled={loading}
                        placeholder="Ingresar cedula de identidad"
                        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.dni ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                    />
                    {errors.dni && <p className="text-red-500 text-xs italic">{errors.dni.message}</p>}
                </div>
                <div className="sm:w-full w-2/4 ml-5 mt-3">
                    <button disabled={loading} type="submit" className='px-8 py-3 rounded-lg bg-primary-pruple-300 text-white'>{loading ? 'Buscando...' : 'Buscar'}</button>
                </div>
            </form>
            {data && 
                <div className='lg:flex'>
                    <div className='sm:w-full md:w-full lg:w-2/5 flex flex-col justify-center items-center shadow border rounded py-3 text-primary-pruple-900'>
                        <div className='w-11/12 flex items-center py-5 mb-2'>
                            <img src={data?.avatar} alt={data?.avatar} className="h-12 w-12 lg:h-28 lg:w-28 rounded-full border-solid ring-4 ring-primary-green-400 p-0.5" />
                            <span className='ml-8 text-5xl'>{data?.first_name} {data?.last_name}</span>
                        </div>
                        <div className='w-11/12 flex border-b justify-between'>
                            <div className='w-3/6 flex flex-col'>
                                <span className='text-xl py-1'>C.I</span>
                            </div>
                            <div className='w-3/6 flex flex-col'>
                                <p className='text-xl py-1 ml-10'>{data?.dni}</p>
                            </div>
                        </div>
                        <div className='w-11/12 flex border-b justify-between'>
                            <div className='w-3/6 flex flex-col'>
                                <span className='text-xl py-1'>Ocupacion</span>
                            </div>
                            <div className='w-3/6 flex flex-col'>
                                <p className='text-xl py-1 ml-10'>{data?.occupation}</p>
                            </div>
                        </div>
                        <div className='w-11/12 flex border-b justify-between'>
                            <div className='w-3/6 flex flex-col'>
                                <span className='text-xl py-1'>Tipo de vivienda</span>
                            </div>
                            <div className='w-3/6 flex flex-col'>
                                <p className='text-xl py-1 ml-10'>{data?.housing}</p>
                            </div>
                        </div>
                        <div className='w-11/12 flex border-b justify-between'>
                            <div className='w-3/6 flex flex-col'>
                                <span className='text-xl py-1'>Telefono</span>
                            </div>
                            <div className='w-3/6 flex flex-col'>
                                <p className='text-xl py-1 ml-10'>{data?.phone}</p>
                            </div>
                        </div>
                        <div className='w-11/12 flex border-b justify-between'>
                            <div className='w-3/6 flex flex-col'>
                                <span className='text-xl py-1'>Correo</span>
                            </div>
                            <div className='w-3/6 flex flex-col'>
                                <p className='text-xl py-1 ml-10 text-ellipsis overflow-hidden'>{data?.email}</p>
                            </div>
                        </div>
                        <div className='w-11/12 flex border-b justify-between'>
                            <div className='w-3/6 flex flex-col'>
                                <span className='text-xl py-1 text-ellipsis overflow-hidden'>Posee mas de una mascota</span>
                            </div>
                            <div className='w-3/6 flex flex-col'>
                                <p className='text-xl py-1 ml-10'>{data?.other_pets ? 'Si' : 'No'}</p>
                            </div>
                        </div>
                        <div className='w-11/12 flex justify-between'>
                            <div className='w-3/6 flex flex-col'>
                                <span className='text-xl py-1'>Cliente desde</span>
                            </div>
                            <div className='w-3/6 flex flex-col'>
                                <span className='text-xl py-1 ml-10'>{format(new Date(data.createdAt), 'dd/LL/yyyy')}</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:ml-5 lg:w-2/3 lg:mt-0 mt-10'>
                        <PetList pets={data.pets}/>
                    </div>
                </div>
            }
        </section>
    );
};