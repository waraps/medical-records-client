import React, { useEffect } from 'react';
import { Button, Flex, Heading, useToast, Text, Box, Avatar, FormControl, FormLabel, Input, FormErrorMessage, Select } from '@chakra-ui/react';
import { useFetch, usePut } from '../../../hooks';
import { IRol, IUser, IUserReq } from '../../../interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import userOwner from '../../../assets/images/galenos.webp';
import { userType } from '../../../tools';
import { editUserSchema, editUserSchemaType } from '../../administrator';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { me } from '../../../state/user';

export const EditAccount = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.user);
    const { data: roles } = useFetch<IRol[]>('/roles');
    const { doUpdate, loading: loadingUpdated, error: errorUpdated, data: userUpdated } = usePut<IUser, IUserReq>(`/users/${user?.id}`);
    const toast = useToast();

    const { register, handleSubmit, formState: { errors, dirtyFields }} = useForm<editUserSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(editUserSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            dni: user?.dni || '',
            email: user?.email || '',
            rol_id: user?.rol_id || 0,
        }
    });

    const onSubmit = async (schema: editUserSchemaType): Promise<void> => {
        doUpdate({
            first_name: schema.first_name,
            last_name: schema.last_name,
            dni: schema.dni,
            email: schema.email,
            rol_id: schema.rol_id,
        });
    };


    useEffect(() => {
        if(!loadingUpdated && userUpdated) {
            dispatch(me());
            toast({
                description: errorUpdated?.message || 'Datos actualizados exitosamente',
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

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Actualizar Datos
            </Heading>
            <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }}
                bg={'white'} borderRadius={{ base: 'none', sm: 'xl' }}
            >
                <Flex>
                    <Avatar marginX={'auto'} showBorder={true} borderColor={'primary.300'} p={0.5}
                        backgroundColor={'primary.50'} borderRadius='15px' size='2xl'
                        name={`${user?.first_name || ''} ${user?.last_name || ''}`} src={user?.avatar || userOwner}
                    />
                </Flex>
                <Box my={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Text marginX={'auto'} noOfLines={1} fontSize={'sm'}>Usuario: #{user?.id}</Text>
                    <Text marginX={'auto'} noOfLines={1} fontSize={'sm'}>Registrado el: {format(new Date(user?.createdAt || new Date()), 'dd/LL/yyyy')}</Text>
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
                        <FormControl mt={2}>
                            <FormLabel htmlFor="rol_id" color="primary.600">Tipo de Usuario</FormLabel>
                            <Select {...register('rol_id', { required: true })}
                                focusBorderColor='primary.400' bg={'white'} variant={'outline'}
                            >
                                {roles?.map(rol => {
                                    return <option key={rol.id} value={rol.id} className={'capitalize'}>{userType(rol.id)}</option>;
                                })}
                            </Select>
                            <FormErrorMessage>
                                {errors.rol_id && errors.rol_id.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex justifyContent={'flex-end'}>
                        <Button type='submit' mt={5} disabled={!dirtyFields} bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}>
                            Actualizar
                        </Button>
                    </Flex>
                </form>
            </Box>
        </>
    );
};
