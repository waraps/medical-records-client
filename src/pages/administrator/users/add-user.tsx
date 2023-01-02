import React, { useEffect } from 'react';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema, userSchemaType } from './user-schema';
import { useFetch, usePost } from '../../../hooks';
import { IRol, IUser, IUserReq } from '../../../interfaces';
import { userType } from '../../../tools';

export const AddUser = (): JSX.Element => {
    const { data: roles } = useFetch<IRol[]>('/roles');
    const { doRequest, loading, error, data } = usePost<IUser, IUserReq>('/users');
    const toast = useToast();

    const { register, handleSubmit, formState: { errors, isDirty } } = useForm<userSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(userSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            first_name: '',
            last_name: '',
            dni: '',
            email: '',
            rol_id: 1,
        }
    });

    const onSubmit = async (schema: userSchemaType): Promise<void> => {
        doRequest({
            first_name: schema.first_name,
            last_name: schema.last_name,
            dni: schema.dni,
            email: schema.email,
            password: schema.password,
            rol_id: schema.rol_id,
        });
    };

    useEffect(() => {
        if(!loading && data && !Boolean(error)) {
            toast({
                description: 'Usuario registrado exitosamente',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
        if (!loading && Boolean(error)) {
            toast({
                description: error?.message || 'Error al registrar usuario',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loading]);

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Nuevo Usuario
            </Heading>
            <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }}
                bg={'white'} borderRadius={{ base: 'none', sm: 'xl' }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl  isInvalid={!!errors?.email?.message} mt={2} isRequired>
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
                        <FormControl isInvalid={!!errors?.password?.message} mx={{base: 'none', md: 2}} mt={2} isRequired>
                            <FormLabel htmlFor="email" color="primary.600">Contraseña</FormLabel>
                            <Input
                                id="password"
                                type="text"
                                focusBorderColor='primary.400'
                                {...register('password', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors?.rol_id?.message}  mt={2} isRequired>
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
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl isInvalid={!!errors?.first_name?.message} mt={2} isRequired>
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
                        <FormControl ml={{base: 'none', md: 2}} isInvalid={!!errors?.last_name?.message} mt={2} isRequired>
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
                        <FormControl isInvalid={!!errors?.dni?.message} mt={2} isRequired>
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
                    </Flex>
                    <Flex justifyContent={'flex-end'}>
                        <Button type='submit' mt={5} disabled={!isDirty} bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}>
                            Registrar
                        </Button>
                    </Flex>
                </form>
            </Box>
        </>
    );
};
