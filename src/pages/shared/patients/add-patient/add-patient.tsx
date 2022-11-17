import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetch, usePost } from '../../../../hooks';
import { IOwner, IOwnerPetReq, IPatient, IPatientReq, IPetSex } from '../../../../interfaces';
import { addOwnerPetSchema, addOwnerPetSchemaType, addPatientSchema, addPatientSchemaType, findOwnerSchema, findOwnerSchemaType } from './add-patient-schema';
import { Button } from '../../../../components';
import { getPetSex } from '../../../../tools';

export const AddPatient = () => {
    const [singlePatient, setSinglePatient] = useState<boolean>(true);

    const { data: sexes } = useFetch<IPetSex[]>('/pet_sex');

    const { loading: ownerLoading, data: ownerCreated, doRequest: ownerCreate } = usePost<IOwner, IOwnerPetReq>('/owners');

    const { loading: patientLoading, data: patientCreated, doRequest: patientCreate } = usePost<IPatient, IPatientReq>('/patients');

    const {loading: findOwnerLoading, data: findOwner, fetchData: fetchFindOwner} = useFetch<IOwner>('', {}, false);

    const { register: registerOwner, handleSubmit: handleSubmitOwner, formState: { errors: errorsOwner } } = useForm<findOwnerSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(findOwnerSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            dni: '',
        }
    });

    const onSubmitOwner = (schema: findOwnerSchemaType): void => {
        fetchFindOwner(`/owners/dni/${schema.dni}`);
    };

    const { register: registerPatient, handleSubmit: handleSubmitPatient, formState: { errors: errorsPatient } } = useForm<addPatientSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(addPatientSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            name: '',
            specie: '',
            race: '', // should be number type (select like sex_id)
            sex_id: 0,
            color: '',
            birth: new Date(),
            neutered: false,
        }
    });

    const onSubmitPatient = (schema: addPatientSchemaType): void => {
        if(findOwner){
            const patient: IPatientReq = {
                specie: schema.specie,
                race: schema.race,
                name: schema.name,
                birth: schema.birth,
                color: schema.color,
                sex_id: schema.sex_id,
                neutered: schema.neutered,
                owner_id: findOwner.id
            };
            patientCreate(patient);
        }
    };
    
    const { register, handleSubmit, formState: { errors: errorsOwnerPet } } = useForm<addOwnerPetSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(addOwnerPetSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            //owner
            first_name: '',
            last_name: '',
            dni: '',
            address: '',
            phone: '',
            email: '',
            occupation: '',
            housing: '', // shoul be a select ?
            other_pets: false,
            // pet
            specie: '',
            race: '',
            name: '',
            birth: new Date(),
            color: '',
            sex_id: 0,
            neutered: false,
        }
    });

    const onSubmit = (schema: addOwnerPetSchemaType): void => {
        const ownerPet: IOwnerPetReq = {
            first_name: schema.first_name,
            last_name: schema.last_name,
            dni: schema.dni,
            address: schema.address,
            phone: schema.phone,
            email: schema.email,
            occupation: schema.occupation,
            housing: schema.housing,
            other_pets: schema.other_pets,
            specie: schema.specie,
            race: schema.race,
            name: schema.name,
            birth: schema.birth,
            color: schema.color,
            sex_id: schema.sex_id,
            neutered: schema.neutered,
        };
        ownerCreate(ownerPet);
    };

    if(singlePatient) {
        return (
            <main>
                <div className='rounded overflow-hidden shadow-lg p-3 mt-3 mr-5 ml-5'>
                    <h2 className='text-3xl text-primary-pruple-700'>Nuevo Paciente</h2>
                    <div className='pt-3'>
                        <p onClick={() => setSinglePatient(!singlePatient)} className='text-lg cursor-pointer underline text-primary-green-400 hover:text-primary-green-600'>
                            Presione aqui para agregar propietario por primera vez
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmitOwner(onSubmitOwner)} className="flex items-center md:w-11/12 lg:w-3/5 rounded overflow-hidden m-5">
                    <div className="w-2/4">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Buscar Propietario
                        </label>
                        <input disabled={findOwnerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwner.dni ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="Ingresar cedula de identidad" {...registerOwner('dni', { required: true })} />
                        {errorsOwner.dni && <p className="text-red-500 text-xs italic">{errorsOwner.dni.message}</p>}
                    </div>
                    <div className="w-2/4 mt-3 ml-5">
                        <button disabled={findOwnerLoading} type="submit" className='px-8 py-3 rounded-lg bg-primary-pruple-300 text-white'>Buscar</button>
                    </div>
                </form>
                <form onSubmit={handleSubmitPatient(onSubmitPatient)}>
                    <fieldset disabled={!Boolean(findOwner)}>
                        <div className="md:w-11/12 lg:w-3/5 rounded overflow-hidden shadow-lg ml-5">
                            <div className="border">
                                <div className="p-5">
                                    <div className='pb-5'>
                                        <h3 className='text-2xl text-primary-pruple-700'>
                                        Mascota
                                        </h3>
                                    </div>
                                    <div className="w-full">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                    Nombre
                                                </label>
                                                <input disabled={patientLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsPatient.name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="Juan" {...registerPatient('name', { required: true })} />
                                                {errorsPatient.name && <p className="text-red-500 text-xs italic">{errorsPatient.name.message}</p>}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-2/6 px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                    Especie
                                                </label>
                                                <input disabled={patientLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsPatient.specie ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-last-name" type="text" placeholder="Perez" {...registerPatient('specie', { required: true })} />
                                                {errorsPatient.specie && <p className="text-red-500 text-xs italic">{errorsPatient.specie.message}</p>}
                                            </div>
                                            <div className="w-2/6 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-dni">
                                                    Raza
                                                </label>
                                                <input disabled={patientLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsPatient.race ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight`} id="grid-dni" type="text" placeholder="12365478" {...registerPatient('race', { required: true })} />
                                                {errorsPatient.race && <p className="text-red-500 text-xs italic">{errorsPatient.race.message}</p>}
                                            </div>
                                            <div className="w-2/6 px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                                                    Sexo
                                                </label>
                                                <div className="relative">
                                                    <select disabled={patientLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsPatient.sex_id ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-rol-id" {...registerPatient('sex_id', { required: true })}>
                                                        {sexes?.map(sex => {
                                                            return <option key={sex.id} value={sex.id} className={'capitalize'}>{getPetSex(sex.id)}</option>;
                                                        })}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                    {errorsPatient.sex_id && <p className="text-red-500 text-xs italic">{errorsPatient.sex_id.message}</p>}
                                                </div> 
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-2/6 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                    Color
                                                </label>
                                                <input disabled={patientLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsPatient.color ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="Juan" {...registerPatient('color', { required: true })} />
                                                {errorsPatient.color && <p className="text-red-500 text-xs italic">{errorsPatient.color.message}</p>}
                                            </div>
                                            <div className="w-2/6 px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                    Nacimiento
                                                </label>
                                                <input disabled={patientLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsPatient.birth ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="date" placeholder="Selecciona una fecha de nacimiento" {...registerPatient('birth', { required: true })} />
                                                {errorsPatient.birth && <p className="text-red-500 text-xs italic">{errorsPatient.birth.message}</p>}
                                            </div>
                                            <div className="w-2/6 px-3 mt-8">
                                                <div className="flex items-center">
                                                    <input disabled={patientLoading} type="checkbox" className="w-4 h-4 text-primary-green-500 bg-gray-100 rounded border-gray-300 focus:text-primary-green-500 dark:focus:text-primary-green-600 dark:ring-offset-text-primary-green-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...registerPatient('neutered', { required: true })} />
                                                    <label className="ml-3 block uppercase tracking-wide text-gray-700 text-xs font-bold">¿La mascota esta castrada?</label>
                                                    {errorsPatient.neutered && <p className="text-red-500 text-xs italic">{errorsPatient.neutered.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button 
                                        loading={patientLoading} 
                                        label={'Agregar'} loadingLabel={'Agregando...'} 
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </main>
        );
    }

    return (
        <main>
            <div className='rounded overflow-hidden shadow-lg p-3 mt-3 mr-5 ml-5'>
                <h2 className='text-3xl text-primary-pruple-700'>Nuevo Paciente</h2>
                <div className='pt-3'>
                    <p onClick={() => setSinglePatient(!singlePatient)} className='text-lg cursor-pointer underline text-primary-green-400 hover:text-primary-green-600'>
                        Presione aqui para agregar mascota a un propietario existente
                    </p>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='lg:flex lg:justify-center px-1'>
                    <div className="lg:w-2/4 rounded overflow-hidden shadow-lg m-5">
                        <div className="border">
                            <div className="p-5">
                                <div className='pb-5'>
                                    <h3 className='text-2xl text-primary-pruple-700'>
                                        Propietario
                                    </h3>
                                </div>
                                <div className="w-full">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-2/4 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                Nombre
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.first_name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="Juan" {...register('first_name', { required: true })} />
                                            {errorsOwnerPet.first_name && <p className="text-red-500 text-xs italic">{errorsOwnerPet.first_name.message}</p>}
                                        </div>
                                        <div className="w-2/4 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Apellido
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.last_name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-last-name" type="text" placeholder="Perez" {...register('last_name', { required: true })} />
                                            {errorsOwnerPet.last_name && <p className="text-red-500 text-xs italic">{errorsOwnerPet.last_name.message}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-2/4 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-dni">
                                                Cedula de Identidad
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.dni ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight`} id="grid-dni" type="text" placeholder="12365478" {...register('dni', { required: true })} />
                                            {errorsOwnerPet.dni && <p className="text-red-500 text-xs italic">{errorsOwnerPet.dni.message}</p>}
                                        </div>
                                        <div className="w-2/4 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                                                Direccion
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.address ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-phone" type="text" placeholder="Urb. Mar Azul, Torre I, Piso 1, Apto 3. Lecheria, Anzoategui" {...register('address', { required: true })} />
                                            {errorsOwnerPet.address && <p className="text-red-500 text-xs italic">{errorsOwnerPet.address.message}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-2/4 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                Telefono
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.phone ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="04125550011" {...register('phone', { required: true })} />
                                            {errorsOwnerPet.phone && <p className="text-red-500 text-xs italic">{errorsOwnerPet.phone.message}</p>}
                                        </div>
                                        <div className="w-2/4 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Correo Electronico
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.email ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-last-name" type="text" placeholder="juanperez@mail.com" {...register('email', { required: true })} />
                                            {errorsOwnerPet.email && <p className="text-red-500 text-xs italic">{errorsOwnerPet.email.message}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-2/6 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                Ocupacion
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.occupation ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="Contador" {...register('occupation', { required: true })} />
                                            {errorsOwnerPet.occupation && <p className="text-red-500 text-xs italic">{errorsOwnerPet.occupation.message}</p>}
                                        </div>
                                        <div className="w-2/6 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Tipo de Vivienda
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.housing ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-last-name" type="text" placeholder="Apto/Casa" {...register('housing', { required: true })} />
                                            {errorsOwnerPet.housing && <p className="text-red-500 text-xs italic">{errorsOwnerPet.housing.message}</p>}
                                        </div>
                                        <div className="w-2/6 px-3 mt-8">
                                            <div className="flex items-center">
                                                <input disabled={ownerLoading} type="checkbox" className="w-4 h-4 text-primary-green-500 bg-gray-100 rounded border-gray-300 focus:text-primary-green-500 dark:focus:text-primary-green-600 dark:ring-offset-text-primary-green-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register('other_pets', { required: true })} />
                                                <label className="ml-3 block uppercase tracking-wide text-gray-700 text-xs font-bold">¿Posee otras mascotas?</label>
                                                {errorsOwnerPet.other_pets && <p className="text-red-500 text-xs italic">{errorsOwnerPet.other_pets.message}</p>}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Pet Form */}
                    <div className="lg:w-2/4 rounded overflow-hidden shadow-lg m-5 border">
                        <div>
                            <div className="p-5">
                                <div className='pb-5'>
                                    <h3 className='text-2xl text-primary-pruple-700'>
                                        Mascota
                                    </h3>
                                </div>
                                <div className="w-full">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                Nombre
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsPatient.name ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="Manchas" {...register('name', { required: true })} />
                                            {errorsOwnerPet.name && <p className="text-red-500 text-xs italic">{errorsOwnerPet.name.message}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-2/6 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Especie
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.specie ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-last-name" type="text" placeholder="Canina" {...register('specie', { required: true })} />
                                            {errorsOwnerPet.specie && <p className="text-red-500 text-xs italic">{errorsOwnerPet.specie.message}</p>}
                                        </div>
                                        <div className="w-2/6 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-dni">
                                                Raza
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.race ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight`} id="grid-dni" type="text" placeholder="Bulldog" {...register('race', { required: true })} />
                                            {errorsOwnerPet.race && <p className="text-red-500 text-xs italic">{errorsOwnerPet.race.message}</p>}
                                        </div>
                                        <div className="w-2/6 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                                                Sexo
                                            </label>
                                            <div className="relative">
                                                <select disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.sex_id ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} id="grid-rol-id" {...register('sex_id', { required: true })}>
                                                    {sexes?.map(sex => {
                                                        return <option key={sex.id} value={sex.id} className={'capitalize'}>{getPetSex(sex.id)}</option>;
                                                    })}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                </div>
                                                {errorsOwnerPet.sex_id && <p className="text-red-500 text-xs italic">{errorsOwnerPet.sex_id.message}</p>}
                                            </div> 
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-2/6 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                Color
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.color ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="text" placeholder="Blanco" {...register('color', { required: true })} />
                                            {errorsOwnerPet.color && <p className="text-red-500 text-xs italic">{errorsOwnerPet.color.message}</p>}
                                        </div>
                                        <div className="w-2/6 px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Nacimiento
                                            </label>
                                            <input disabled={ownerLoading} className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${errorsOwnerPet.birth ? 'border-red-500' : 'border-gray-200'} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`} type="date" placeholder="Selecciona una fecha de nacimiento" {...register('birth', { required: true })} />
                                            {errorsOwnerPet.birth && <p className="text-red-500 text-xs italic">{errorsOwnerPet.birth.message}</p>}
                                        </div>
                                        <div className="w-2/6 px-3 mt-8">
                                            <div className="flex items-center">
                                                <input disabled={ownerLoading} type="checkbox" className="w-4 h-4 text-primary-green-500 bg-gray-100 rounded border-gray-300 focus:text-primary-green-500 dark:focus:text-primary-green-600 dark:ring-offset-text-primary-green-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" {...register('neutered', { required: true })} />
                                                <label className="ml-3 block uppercase tracking-wide text-gray-700 text-xs font-bold">¿La mascota esta castrada?</label>
                                                {errorsOwnerPet.neutered && <p className="text-red-500 text-xs italic">{errorsOwnerPet.neutered.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mr-5 ml-5'>
                    <Button 
                        loading={ownerLoading ||  patientLoading} 
                        label={'Agregar'} loadingLabel={'Agregando...'} 
                    />
                </div>
            </form>
        </main>
    );
};