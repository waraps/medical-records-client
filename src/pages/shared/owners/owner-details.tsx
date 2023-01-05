/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { Avatar, Box, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch, usePut } from '../../../hooks';
import { IOwner } from '../../../interfaces/network/res/IOwner';

import avatarOwner from '../../../assets/images/galenos.webp';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IOwnerReq, IPatient } from '../../../interfaces';
import { ownerSchema, ownerSchemaType } from './owner-schema';
import { format } from 'date-fns';
import { DataTable } from '../../../components';
import { CellProps, Column } from 'react-table';
import { useAppSelector } from '../../../state/hooks';
import { ProfileConstants } from '../../../constants';

export const DetailsOwner = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchData, loading, error, data: owner} = useFetch<IOwner>(`/owners/${id}`, undefined, false);
    const { doUpdate, loading: loadingUpdated, error: errorUpdated, data: patientUpdated } = usePut<IOwner, IOwnerReq>(`/owners/${id}`);
    const toast = useToast();
    const { isOpen, onToggle } = useDisclosure();

    const { user } = useAppSelector(state => state.user);
    const isReceptionist = user?.rol_id === ProfileConstants.RECEPTIONIST;

    useEffect(() => fetchData(), []);

    const { register, handleSubmit, formState: { errors, isDirty }, watch, reset} = useForm<ownerSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(ownerSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            first_name: owner?.first_name || '',
            last_name: owner?.last_name || '',
            dni: owner?.dni || '',
            phone: owner?.phone || '',
            address: owner?.address || '',
            email: owner?.email || '',
            occupation: owner?.occupation || '',
            housing: owner?.housing || '',
            other_pets: owner?.other_pets || false,
        }
    });

    const onSubmit = async (schema: ownerSchemaType): Promise<void> => {
        doUpdate({
            first_name: schema.first_name,
            last_name: schema.last_name,
            dni: schema.dni,
            phone: schema.phone,
            address: schema.address,
            email: schema.email,
            occupation: schema.occupation,
            housing: schema.housing,
            other_pets: schema.other_pets,
        });
    };

    useEffect(() => {
        if(owner){
            reset({
                first_name: owner.first_name,
                last_name: owner.last_name,
                dni: owner.dni,
                phone: owner.phone,
                address: owner.address,
                email: owner.email,
                occupation: owner.occupation,
                housing: owner.housing,
                other_pets: owner.other_pets,
            });
        }
    }, [owner]);

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

    const columns: Column<IPatient>[] =  [
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
            id: 'specie',
            Header: 'Especie',
            accessor: 'specie'
        },
        {
            id: 'race',
            Header: 'Raza',
            accessor: 'race'
        },
        {
            id: 'details',
            Header: 'Detalles',
            accessor: 'id',
            Cell: ({ value }: CellProps<IPatient>) => {
                return (
                    <Button
                        bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}
                        variant={'outline'}
                        size={'sm'}
                        onClick={() => navigate(`/paciente/${value}`)}>
                        Ver Detalles
                    </Button>
                );
            },
            disableSortBy: true,
        },
    ];

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Detalles del Propietario
            </Heading>
            <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }}
                bg={'white'} borderRadius={{ base: 'none', sm: 'xl' }}
            >
                <Flex>
                    <Avatar marginX={'auto'} showBorder={true} borderColor={'primary.300'} p={0.5}
                        backgroundColor={'primary.50'} borderRadius='15px' size='2xl'
                        name={`${owner?.first_name || ''} ${owner?.last_name || ''}`} src={owner?.avatar || avatarOwner}
                    />
                </Flex>
                <Box my={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Text marginX={'auto'} noOfLines={1} fontSize={'sm'}>Cliente desde: {format(new Date(owner?.createdAt || new Date()), 'dd/LL/yyyy')}</Text>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.first_name?.message} mt={2}>
                            <FormLabel htmlFor="email" color="primary.600">Nombre</FormLabel>
                            <Input
                                id="first_name"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('first_name', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.first_name && errors.first_name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl ml={{base: 'none', md: 2}} isInvalid={!!errors?.last_name?.message} mt={2}>
                            <FormLabel htmlFor="last_name" color="primary.600">Apellido</FormLabel>
                            <Input
                                id="last_name"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('last_name', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.last_name && errors.last_name.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.dni?.message} mt={2}>
                            <FormLabel htmlFor="dni" color="primary.600">C.I</FormLabel>
                            <Input
                                id="dni"
                                type="number"
                                focusBorderColor='primary.400'
                                {...register('dni', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.dni && errors.dni.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mx={{base: 'none', md: 2}} isInvalid={!!errors?.phone?.message} mt={2}>
                            <FormLabel htmlFor="phone" color="primary.600">Teléfono</FormLabel>
                            <Input
                                id="phone"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('phone', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.phone && errors.phone.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mx={{base: 'none', md: 2}} isInvalid={!!errors?.email?.message} mt={2}>
                            <FormLabel htmlFor="email" color="primary.600">Correo</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                focusBorderColor='primary.400'
                                {...register('email', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.address?.message} mt={2}>
                            <FormLabel htmlFor="address" color="primary.600">Dirección</FormLabel>
                            <Input
                                id="address"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('address', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.address && errors.address.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.housing?.message} mt={2}>
                            <FormLabel htmlFor="housing" color="primary.600">Tipo de Vivienda</FormLabel>
                            <Input
                                id="housing"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('housing', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.housing && errors.housing.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mx={{base: 'none', md: 2}} isInvalid={!!errors?.phone?.message} mt={2}>
                            <FormLabel htmlFor="occupation" color="primary.600">Ocupación</FormLabel>
                            <Input
                                id="occupation"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('occupation', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.occupation && errors.occupation.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mt={2}>
                            <FormLabel htmlFor="other_pets" color="primary.600" mb={4}>¿Posee más de una mascota?</FormLabel>
                            <Checkbox id="other_pets" {...register('other_pets', { required: true })} mx={1}>{watch('other_pets') ? 'Si' : 'No'}</Checkbox>
                            <FormErrorMessage>
                                {errors.other_pets && errors.other_pets.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    {isReceptionist && <Flex justifyContent={'flex-end'}>
                        <Button type='submit' mt={5} disabled={!isDirty} bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}>
                            Actualizar
                        </Button>
                    </Flex>}
                </form>
                <Box mb={2} mt={isReceptionist ? 'none' : 5}>
                    <Button variant="link" color="primary.400" size="sm" onClick={onToggle}>
                        { !isOpen ? 'Ocultar mascotas' : 'Ver mascotas' }
                    </Button>
                </Box>
                {!isOpen &&
                <DataTable
                    columns={columns}
                    data={owner?.pets || []}
                    loading={loading}
                    hideSearch={true}
                />
                }
            </Box>
        </>
    );
};
