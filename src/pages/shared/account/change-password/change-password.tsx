import React, { useEffect, useState } from 'react';
import { Text, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, InputGroup, InputRightElement, useDisclosure, useToast, Button } from '@chakra-ui/react';
import { Card, CardBody, CardHeader } from '../../../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema, passwordSchemaType } from './password-schema';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { IUser } from '../../../../interfaces';
import { usePut } from '../../../../hooks';
import { AlertPassword } from './change-password-modal';

interface IChangePasswordReq {
    currentPassword: string;
    newPassword: string;
}

export const ChangePassword = (): JSX.Element => {
    const { doUpdate, loading, error, data } = usePut<IUser, IChangePasswordReq>('users/change/password');
    const [showCurrent, setShowCurrent] = useState<boolean>(false);
    const [showNew, setShowNew] = useState<boolean>(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const { register, handleSubmit, formState: { errors, isDirty } } = useForm<passwordSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(passwordSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        }
    });

    const onSubmit = async (schema: passwordSchemaType): Promise<void> => {
        const { currentPassword, newPassword, repeatNewPassword } = schema;
        if(newPassword === repeatNewPassword) {
            doUpdate({ currentPassword, newPassword });
        } else {
            onOpen();
        }
    };

    useEffect(() => {
        if(!loading && data) {
            toast({
                description: 'Contraseña actualizada exitosamente',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
        if (!loading && Boolean(error)) {
            toast({
                description: error?.message || 'Error actualizando contraseña',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loading]);

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'}>
                Cambiar contraseña
            </Heading>
            <Card p='16px' my={{ sm: '24px', xl: '0px' }}>
                <CardHeader p='12px 5px' mb='12px'>
                    <Text fontSize='lg' color={'primary.700'}>
                    La longitud de la nueva contraseña al menos debe ser de 8 caracteres
                    </Text>
                </CardHeader>
                <CardBody px='5px' py='10px'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex direction='column'>
                            <FormControl isInvalid={!!errors?.currentPassword?.message} isRequired my={'2'}>
                                <FormLabel htmlFor="currentPassword" color="primary.600">Ingrese contraseña actual</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <IconButton
                                            variant="link"
                                            aria-label={showCurrent ? 'Ocultar contraseña' : 'Revelar contraseña'}
                                            icon={showCurrent ? <HiEyeOff /> : <HiEye />}
                                            onClick={() => setShowCurrent(!showCurrent)}
                                        />
                                    </InputRightElement>
                                    <Input
                                        id="currentPassword"
                                        type={showCurrent ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        focusBorderColor='primary.400'
                                        {...register('currentPassword', { required: true })}
                                    />
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.currentPassword && errors.currentPassword.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.newPassword?.message} isRequired my={'2'}>
                                <FormLabel htmlFor="newPassword" color="primary.600">Ingrese nueva contraseña</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <IconButton
                                            variant="link"
                                            aria-label={showNew ? 'Ocultar contraseña' : 'Revelar contraseña'}
                                            icon={showNew ? <HiEyeOff /> : <HiEye />}
                                            onClick={() => setShowNew(!showNew)}
                                        />
                                    </InputRightElement>
                                    <Input
                                        id="newPassword"
                                        type={showNew ? 'text' : 'password'}
                                        autoComplete="newPassword"
                                        focusBorderColor='primary.400'
                                        {...register('newPassword', { required: true })}
                                    />
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.newPassword && errors.newPassword.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors?.newPassword?.message} isRequired my={'2'}>
                                <FormLabel htmlFor="repeatNewPassword" color="primary.600">Repita la nueva contraseña</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <IconButton
                                            variant="link"
                                            aria-label={showNew ? 'Ocultar contraseña' : 'Revelar contraseña'}
                                            icon={showNew ? <HiEyeOff /> : <HiEye />}
                                            onClick={() => setShowNew(!showNew)}
                                        />
                                    </InputRightElement>
                                    <Input
                                        id="repeatNewPassword"
                                        type={showNew ? 'text' : 'password'}
                                        autoComplete="repeatNewPassword"
                                        focusBorderColor='primary.400'
                                        {...register('repeatNewPassword', { required: true })}
                                    />
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.repeatNewPassword && errors.repeatNewPassword.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Flex>
                        <Flex justifyContent={'flex-end'}>
                            <Button type='submit' mt={5} disabled={!isDirty} bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}>
                                Actualizar
                            </Button>
                        </Flex>
                    </form>
                </CardBody>
            </Card>
            <AlertPassword isOpen={isOpen} onClose={onClose} />
        </>
    );
};
