import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetch, usePost } from '../../../../hooks';
import { IRol, IUser, IUserReq } from '../../../../interfaces';
import { addUserSchema, addUserSchemaType } from './add-user-schema';
import { Button } from '../../../../components';
import { userType } from '../../../../tools';

export const AddUser = () => {
    const { data: roles } = useFetch<IRol[]>('/roles');
    const { loading: loadingCreate, doRequest } = usePost<IUser, IUserReq>('/users');
    
    const { register, handleSubmit, formState: { errors } } = useForm<addUserSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(addUserSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            first_name: '',
            last_name: '',
            dni: '',
            phone: '',
            email: '',
            password: '',
            rol_id: 0,
        }
    });

    const onSubmit = (schema: addUserSchemaType): void => {
        const { first_name, last_name, dni, phone, email, password, rol_id } = schema;
        doRequest({ first_name, last_name, dni, phone, email, password, rol_id });
    };

    return (
        <div className="max-w-screen-lg rounded overflow-hidden shadow-lg">
            <div className="border">
                <div className="p-5">
                    <div className='pb-5'>
                        <h3 className='text-3xl'>
                            Nuevo Usuario
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-2/4 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Nombre
                                </label>
                                <input disabled={loadingCreate} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.first_name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="Juan" {...register('first_name', { required: true })} />
                                {errors.first_name && <p className="text-red-500 text-xs italic">{errors.first_name.message}</p>}
                            </div>
                            <div className="w-2/4 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Apellido
                                </label>
                                <input disabled={loadingCreate} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.last_name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-last-name" type="text" placeholder="Perez" {...register('last_name', { required: true })} />
                                {errors.last_name && <p className="text-red-500 text-xs italic">{errors.last_name.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-2/4 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-dni">
                                    Cedula de Identidad
                                </label>
                                <input disabled={loadingCreate} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.dni? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight`} id="grid-dni" type="text" placeholder="12365478" {...register('dni', { required: true })} />
                                {errors.dni && <p className="text-red-500 text-xs italic">{errors.dni.message}</p>}
                            </div>
                            <div className="w-2/4 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                                    Telefono
                                </label>
                                <input disabled={loadingCreate} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-phone" type="text" placeholder="04247894125" {...register('phone', { required: true })} />
                                {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone?.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Correo electronico
                                </label>
                                <input disabled={loadingCreate} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-email" type="email" placeholder="Correo Electronico" {...register('email', { required: true })}  />
                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email?.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Contrasena
                                </label>
                                <input disabled={loadingCreate} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-password" type="password" placeholder="******************" {...register('password', { required: true })} />
                                <p className="text-gray-600 text-xs italic">Hazla lo mas larga posible</p>
                                {errors.password && <p className="text-red-500 text-xs italic">{errors.password?.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2 justify-center items-center">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                    Tipo de Usuario
                                </label>
                                <div className="relative">
                                    <select disabled={loadingCreate} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errors.rol_id ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-rol-id" {...register('rol_id', { required: true })}>
                                        {roles?.map(rol => {
                                            return <option key={rol.id} value={rol.id} className={'capitalize'}>{userType(rol.id)}</option>;
                                        })}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                    {errors.rol_id && <p className="text-red-500 text-xs italic">{errors.rol_id.message}</p>}
                                </div>
                            </div>
                        </div>
                        <Button loading={loadingCreate} label={'Registrar'} loadingLabel={'Registrando...'} />
                    </form>
                </div>
            </div>
        </div>
    );
};