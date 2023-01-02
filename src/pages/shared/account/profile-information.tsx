import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Card, CardBody, CardHeader } from '../../../components';

interface IProfileInformation {
    title: string;
    description: string;
    name: string;
    dni: string;
    email: string;
    user_type: string;
    created_At: string;
}

export const ProfileInformation = (props : IProfileInformation): JSX.Element => {
    const { title, description, name, dni, email, user_type, created_At } = props;

    return (
        <Card p='16px' my={{ sm: '24px', xl: '0px' }}>
            <CardHeader p='12px 5px' mb='12px'>
                <Text fontSize='lg' color={'primary.700'} fontWeight='bold'>
                    {title}
                </Text>
            </CardHeader>
            <CardBody px='5px'>
                <Flex direction='column'>
                    <Text fontSize='md' color='primary.300' fontWeight='400' mb='30px'>
                        {description}
                    </Text>
                    {
                        name.length > 0 && (
                            <Flex align='center' mb='18px'>
                                <Text fontSize='md' color={'primary.700'} fontWeight='bold' me='10px'>
                                    Nombre:{' '}
                                </Text>
                                <Text fontSize='md' color='primary.400' fontWeight='400'>
                                    {name}
                                </Text>
                            </Flex>
                        )
                    }
                    {
                        dni.length > 0 && (
                            <Flex align='center' mb='18px'>
                                <Text fontSize='md' color={'primary.700'} fontWeight='bold' me='10px'>
                                    C.I:{' '}
                                </Text>
                                <Text fontSize='md' color='primary.400' fontWeight='400'>
                                    {dni}
                                </Text>
                            </Flex>
                        )
                    }
                    {
                        email.length > 0 && (
                            <Flex align='center' mb='18px'>
                                <Text fontSize='md' color={'primary.700'} fontWeight='bold' me='10px'>
                                    Correo:{' '}
                                </Text>
                                <Text fontSize='md' color='primary.400' fontWeight='400'>
                                    {email}
                                </Text>
                            </Flex>
                        )
                    }
                    {
                        user_type.length > 0 && (
                            <Flex align='center' mb='18px'>
                                <Text fontSize='md' color={'primary.700'} fontWeight='bold' me='10px'>
                                    Tipo de usuario:{' '}
                                </Text>
                                <Text fontSize='md' color='primary.400' fontWeight='400'>
                                    {user_type}
                                </Text>
                            </Flex>
                        )
                    }
                    {
                        created_At.length > 0 && (
                            <Flex align='center' mb='18px'>
                                <Text fontSize='md' color={'primary.700'} fontWeight='bold' me='10px'>
                                    Usuario desde:{' '}
                                </Text>
                                <Text fontSize='md' color='primary.400' fontWeight='400'>
                                    {created_At}
                                </Text>
                            </Flex>
                        )
                    }
                </Flex>
            </CardBody>
        </Card>
    );
};
