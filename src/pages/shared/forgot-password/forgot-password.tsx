import React, { useEffect } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, HStack, Input, Stack, useBreakpointValue, useColorModeValue, Image, FormErrorMessage, useToast } from '@chakra-ui/react';

import Logo from '../../../assets/images/galenos.webp';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Footer } from '../../../components';
import { forgotPasswordSchema, forgotPasswordSchemaType } from './forgot-password-schema';
import { usePost } from '../../../hooks';
import { IRecoveryPassword, IRecoveryPasswordReq } from '../../../interfaces';

export const ForgotPassword = (): JSX.Element => {
    const { doRequest, loading, error, data } = usePost<IRecoveryPassword, IRecoveryPasswordReq>('/auth/recovery/password');
    const toast = useToast();


    const { register, handleSubmit, formState: { errors } } = useForm<forgotPasswordSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(forgotPasswordSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = async (schema: forgotPasswordSchemaType): Promise<void> => {
        const { email } = schema;
        doRequest({ email });
    };

    useEffect(() => {
        if (!loading && data) {
            toast({
                title: 'Contraseña recuperada exitosamente',
                description: 'La nueva contraseña fue enviada a su correo electrónico',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
        if (!loading && Boolean(error)) {
            toast({
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
            <Box minH="95.4vh" bg={'primary.50'}>
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
                                    Recuperar contraseña
                                </Heading>
                            </Stack>
                        </Stack>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box
                                py={{ base: '0', sm: '8' }}
                                px={{ base: '4', sm: '10' }}
                                bg={'white'}
                                boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                                borderRadius={{ base: 'none', sm: 'xl' }}
                            >
                                <Stack spacing="6" py={'5'}>
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
                                    </Stack>
                                    <Stack spacing="6">
                                        <Button isLoading={loading} loadingText='Cargando' type='submit' bg={'primary.400'} color={'white'} _hover={{bg: 'primary.600'}}>Recuperar</Button>
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

