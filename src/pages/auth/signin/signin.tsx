import React, { useEffect } from 'react';
import {
    Box, Button, Container, FormControl, FormLabel, Heading,
    HStack, Input, Stack, useBreakpointValue, useColorModeValue,
    IconButton, InputGroup, InputRightElement, useDisclosure,
    Image, FormErrorMessage, useToast
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { signin } from '../../../state/auth';

import { HiEye, HiEyeOff } from 'react-icons/hi';
import Logo from '../../../assets/images/galenos.webp';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signinSchema, signinSchemaType } from './signin-schema';
import { Footer } from '../../../components';

export const Signin = (): JSX.Element => {
    const {loading, error} = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const { isOpen, onToggle } = useDisclosure();
    const toast = useToast();


    const { register, handleSubmit, formState: { errors } } = useForm<signinSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(signinSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (schema: signinSchemaType): Promise<void> => {
        const { email, password } = schema;
        dispatch(signin({ email, password }));
    };

    useEffect(() => {
        if (!loading && Boolean(error)) {
            toast({
                // title: 'Account created.',
                description: error?.message || 'Ha ocurrido un error',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loading]);


    return (
        <>
            <Box minH="95.4vh">
                <Container py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
                    <Stack spacing="8">
                        <Stack spacing="6">
                            <HStack justify="center">
                                <Image
                                    borderRadius='full'
                                    boxSize='120px' src={Logo} alt='Galenos Clinica Veterinaria' />
                            </HStack>
                            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })} color="primary.600">
                                    Iniciar sesión en tu cuenta
                                </Heading>
                            </Stack>
                        </Stack>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box
                                py={{ base: '0', sm: '8' }}
                                px={{ base: '4', sm: '10' }}
                                bg={useBreakpointValue({ base: 'transparent', sm: 'white' })}
                                boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                                borderRadius={{ base: 'none', sm: 'xl' }}
                            >
                                <Stack spacing="6">
                                    <Stack spacing="5">
                                        <FormControl isInvalid={!!errors?.email?.message} isRequired>
                                            <FormLabel htmlFor="email" color="primary.600">Correo Electrónico</FormLabel>
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
                                        <FormControl isInvalid={!!errors?.password?.message} isRequired>
                                            <FormLabel htmlFor="password" color="primary.600">Contraseña</FormLabel>
                                            <InputGroup>
                                                <InputRightElement>
                                                    <IconButton
                                                        variant="link"
                                                        aria-label={isOpen ? 'Ocultat contraseña' : 'Revelar contraseña'}
                                                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                                                        onClick={onToggle}
                                                    />
                                                </InputRightElement>
                                                <Input
                                                    id="password"
                                                    type={isOpen ? 'text' : 'password'}
                                                    autoComplete="current-password"
                                                    focusBorderColor='primary.400'
                                                    {...register('password', { required: true })}
                                                />
                                            </InputGroup>
                                            <FormErrorMessage>
                                                {errors.password && errors.password.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Stack>
                                    <HStack justify="flex-end">
                                        <Button variant="link" color="primary.600" size="sm">
                                    ¿Olvidaste la contraseña?
                                        </Button>
                                    </HStack>
                                    <Stack spacing="6">
                                        <Button isLoading={loading} loadingText='Cargando' type='submit' bg={'primary.400'} color={'white'} _hover={{bg: 'primary.600'}}>Ingresar</Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        </form>
                    </Stack>
                </Container>
            </Box>
            <Footer />
        </>
    );
};
