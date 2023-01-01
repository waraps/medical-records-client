import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Avatar, Box, Text, useToast, FormControl, FormErrorMessage, FormLabel, Input, useColorModeValue, Flex, Heading } from '@chakra-ui/react';

import { useFetch } from '../../../hooks';
import { IPatient } from '../../../interfaces';

import avatarPet from '../../../assets/images/galenos.webp';
import { yupResolver } from '@hookform/resolvers/yup';
import { patientSchema, patientSchemaType } from './patient-schema';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

export const PatientDetails = () => {
    const { id } = useParams();
    const { fetchData, loading, error, data: patient} = useFetch<IPatient>(`/patients/${id}`, undefined, false);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => fetchData(), []);

    useEffect(() => {
        if (!loading && Boolean(error)) {
            toast({
                description: error?.message || 'Error actualizando datos',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }

    }, [loading]);

    const { register, handleSubmit, formState: { errors } } = useForm<patientSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(patientSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            name: patient?.name || '',
            specie: patient?.specie || '',
            race: patient?.race || '',
            birth: patient?.birth || new Date(),
            color: patient?.color || '',
            sex_id: patient?.sex_id,
            neutered: patient?.neutered || false,
        }
    });

    const onSubmit = async (schema: patientSchemaType): Promise<void> => {
        const { name } = schema;
        console.log(name);
        navigate('/');
    };

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Detalles del Paciente
            </Heading>
            <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }}
                bg={'white'}
                boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                borderRadius={{ base: 'none', sm: 'xl' }}>
                <Flex>
                    <Avatar marginX={'auto'} showBorder={true} borderColor={'primary.300'} p={0.5}
                        size='2xl' name={patient?.name || ''} src={patient?.avatar || avatarPet}
                    />
                </Flex>
                <Box my={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Text marginX={'auto'} noOfLines={1} fontSize={'sm'} fontWeight={'bold'}>Historia Nro {patient?.id}</Text>
                    <Text marginX={'auto'} noOfLines={1} fontSize={'sm'}>Paciende desde: {format(new Date(patient?.birth || new Date()), 'dd/LL/yyyy')}</Text>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.name?.message}>
                            <FormLabel htmlFor="email" color="primary.600">Nombre</FormLabel>
                            <Input
                                id="name"
                                type="text"
                                variant={'filled'}
                                disabled={true}
                                focusBorderColor='primary.400'
                                {...register('name', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl ml={{base: 'none', md: 2}} isInvalid={!!errors?.specie?.message}>
                            <FormLabel htmlFor="specie" color="primary.600">Especie</FormLabel>
                            <Input
                                id="specie"
                                type="text"
                                variant={'filled'}
                                disabled={true}
                                focusBorderColor='primary.400'
                                {...register('specie', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.specie && errors.specie.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.race?.message}>
                            <FormLabel htmlFor="race" color="primary.600">Raza</FormLabel>
                            <Input
                                id="race"
                                type="text"
                                variant={'filled'}
                                disabled={true}
                                focusBorderColor='primary.400'
                                {...register('race', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.race && errors.race.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl ml={{base: 'none', md: 2}}>
                            <FormLabel htmlFor="date" color="primary.600">Nacimiento</FormLabel>
                            <Input
                                id="date"
                                type="date"
                                variant={'filled'}
                                disabled={true}
                                focusBorderColor='primary.400'
                                {...register('birth', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.birth && errors.birth.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.name?.message}>
                            <FormLabel htmlFor="color" color="primary.600">Color</FormLabel>
                            <Input
                                id="color"
                                type="text"
                                variant={'filled'}
                                disabled={true}
                                focusBorderColor='primary.400'
                                {...register('color', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.color && errors.color.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl ml={{base: 'none', md: 2}}>
                            <FormLabel htmlFor="sex_id" color="primary.600">Sexo</FormLabel>
                            <Input
                                id="sex_id"
                                type="text"
                                variant={'filled'}
                                disabled={true}
                                focusBorderColor='primary.400'
                            />
                            <FormErrorMessage>
                                {errors.sex_id && errors.sex_id.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="neutered" color="primary.600">Esterilizado</FormLabel>
                            <Input
                                id="neutered"
                                type="text"
                                variant={'filled'}
                                disabled={true}
                                focusBorderColor='primary.400'
                            />
                            <FormErrorMessage>
                                {errors.neutered && errors.neutered.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl>
                            <FormLabel htmlFor="neutered" color="primary.600">Dueno</FormLabel>
                            <Input
                                id="owner"
                                type="text"
                                variant={'filled'}
                                disabled={true}
                                focusBorderColor='primary.400'
                                value={`${patient?.owner.first_name || ''} ${patient?.owner.last_name || ''}`}
                            />
                        </FormControl>
                    </Flex>
                </form>
            </Box>
        </>

    );
};
