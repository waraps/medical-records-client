import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, Box, Text, useToast, FormControl, FormErrorMessage, FormLabel, Input, Flex, Heading, Button, Checkbox, Select, Spinner } from '@chakra-ui/react';

import { useFetch, usePut } from '../../../hooks';
import { IPatient, IPatientReq, IPetSex } from '../../../interfaces';

import avatarPet from '../../../assets/images/galenos.webp';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema, patientSchemaType } from './patient-schema';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { getPetSex } from '../../../tools';

export const PatientDetails = () => {
    const { id } = useParams();
    const { data: sexes } = useFetch<IPetSex[]>('/pet_sex');
    const { fetchData, loading, error, data: patient} = useFetch<IPatient>(`/patients/${id}`, undefined, false);
    const { doUpdate, loading: loadingUpdated, error: errorUpdated, data: patientUpdated } = usePut<IPatient, IPatientReq>(`/patients/${id}`);
    const toast = useToast();

    useEffect(() => fetchData(), []);

    const { register, handleSubmit, formState: { errors, isDirty }, reset, watch } = useForm<patientSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(patientSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            name: patient?.name || '',
            specie: patient?.specie || '',
            race: patient?.race || '',
            birth: format(new Date(patient?.createdAt || new Date()), 'yyyy-LL-dd'),
            color: patient?.color || '',
            sex_id: patient?.sex_id,
            neutered: patient?.neutered || false,
        }
    });

    useEffect(() => {
        if(patient){
            reset({
                name: patient?.name || '',
                specie: patient?.specie || '',
                race: patient?.race || '',
                birth: format(new Date(patient?.createdAt || new Date()), 'yyyy-LL-dd'),
                color: patient?.color || '',
                sex_id: patient?.sex_id,
                neutered: patient?.neutered || false,
            });
        }
    }, [patient]);

    useEffect(() => {
        if(!loadingUpdated && patientUpdated) {
            fetchData();
            toast({
                description: 'Datos actualizados exitosamente',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
        if (!loadingUpdated && Boolean(errorUpdated)) {
            toast({
                description: errorUpdated?.message || 'Error actualizando datos',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loadingUpdated]);

    useEffect(() => {
        if (!loading && Boolean(error)) {
            toast({
                description: error?.message || 'Error al cargar datos',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loading]);

    const onSubmit = async (schema: patientSchemaType): Promise<void> => {
        doUpdate({
            specie: schema.specie,
            race: schema.race,
            name: schema.name,
            birth: new Date(schema.birth),
            color: schema.color,
            sex_id: schema.sex_id,
            neutered: schema.neutered,
            owner_id: patient?.owner.id || 0
        });
    };

    if(loading) {
        return (
            <Flex alignItems={'center'} height={'lg'} flexDirection={'column'}>
                <Spinner
                    thickness='3px'
                    speed='0.65s'
                    emptyColor='primary.100'
                    color='primary.400'
                    size='xl'
                />
                <Text mt={2} size='sm' noOfLines={1} ml={'1'} mb={'5'} >
                    Cargando datos ...
                </Text>
            </Flex>
        );
    }

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Detalles del Paciente
            </Heading>
            <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }}
                bg={'white'} borderRadius={{ base: 'none', sm: 'xl' }}
            >
                <Flex>
                    <Avatar marginX={'auto'} showBorder={true} borderColor={'primary.300'} p={0.5}
                        backgroundColor={'primary.50'} borderRadius='15px' size='2xl'
                        name={patient?.name || ''} src={patient?.avatar || avatarPet}
                    />
                </Flex>
                <Box my={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Text marginX={'auto'} noOfLines={1} fontSize={'sm'} fontWeight={'bold'}>Historia Nro {patient?.id}</Text>
                    <Text marginX={'auto'} noOfLines={1} fontSize={'sm'}>Paciende desde: {format(new Date(patient?.createdAt || new Date()), 'dd/LL/yyyy')}</Text>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.name?.message} mt={2}>
                            <FormLabel htmlFor="name" color="primary.600">Nombre</FormLabel>
                            <Input
                                id="name"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('name', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl ml={{base: 'none', md: 2}} mt={2}>
                            <FormLabel htmlFor="owner" color="primary.600">Dueno</FormLabel>
                            <Input
                                id="owner"
                                type="text"
                                focusBorderColor='primary.400'
                                value={`${patient?.owner.first_name || ''} ${patient?.owner.last_name || ''}`}
                                disabled
                            />
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.specie?.message} mt={2}>
                            <FormLabel htmlFor="specie" color="primary.600">Especie</FormLabel>
                            <Input
                                id="specie"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('specie', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.specie && errors.specie.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl ml={{base: 'none', md: 2}} isInvalid={!!errors?.race?.message} mt={2}>
                            <FormLabel htmlFor="race" color="primary.600">Raza</FormLabel>
                            <Input
                                id="race"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('race', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.race && errors.race.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.color?.message} mt={2}>
                            <FormLabel htmlFor="color" color="primary.600">Color</FormLabel>
                            <Input
                                id="color"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('color', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.color && errors.color.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mx={{base: 'none', md: 2}} mt={2}>
                            <FormLabel htmlFor="sex_id" color="primary.600">Sexo</FormLabel>
                            <Select {...register('sex_id', { required: true })}
                                focusBorderColor='primary.400' bg={'white'} variant={'outline'}
                            >
                                {sexes?.map(sex => {
                                    return <option key={sex.id} value={sex.id} className={'capitalize'}>{getPetSex(sex.id)}</option>;
                                })}
                            </Select>
                            <FormErrorMessage>
                                {errors.sex_id && errors.sex_id.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mx={{base: 'none', md: 2}} mt={2}>
                            <FormLabel htmlFor="date" color="primary.600">Nacimiento</FormLabel>
                            <Input id="date"
                                type="date"
                                focusBorderColor='primary.400'
                                {...register('birth', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.birth && errors.birth.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mt={2}>
                            <FormLabel htmlFor="neutered" color="primary.600" mb={4}>Esterilizado</FormLabel>
                            <Checkbox id="neutered" {...register('neutered', { required: true })} mx={1}>{watch('neutered') ? 'Si' : 'No'}</Checkbox>
                            <FormErrorMessage>
                                {errors.neutered && errors.neutered.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex justifyContent={'flex-end'}>
                        <Button type='submit' mt={5} disabled={!isDirty} bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}>
                            Actualizar
                        </Button>
                    </Flex>
                </form>
            </Box>
        </>

    );
};
