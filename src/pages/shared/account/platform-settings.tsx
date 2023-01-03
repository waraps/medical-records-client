import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Card, CardBody, CardHeader } from '../../../components';
import { RiKeyFill } from 'react-icons/ri';
import { HiAdjustments } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface IPlatformSettings  {
    title: string;
}

export const PlatformSettings = ({ title }: IPlatformSettings) => {

    return (
        <Card p='16px'>
            <CardHeader p='12px 5px' mb='12px'>
                <Text fontSize='lg' color={'primary.700'} fontWeight='bold'>
                    {title}
                </Text>
            </CardHeader>
            <CardBody px='5px'>
                <Flex direction='column'>
                    <Link to={'/cambiar/contraseña'}>
                        <Flex align='center' mb='20px' color={'primary.700'}>
                            <RiKeyFill size={20} />
                            <Text ml={2} noOfLines={1} fontSize='md' color='primary.400' fontWeight='400' _hover={{textDecor: 'underline'}}>
                                Cambiar contraseña
                            </Text>
                        </Flex>
                    </Link>
                    <Link to={'/cuenta/actualizar'}>
                        <Flex align='center' mb='20px' color={'primary.700'}>
                            <HiAdjustments size={20} />
                            <Text ml={2} noOfLines={1} fontSize='md' color='primary.400' fontWeight='400' _hover={{textDecor: 'underline'}}>
                                Actualizar datos
                            </Text>
                        </Flex>
                    </Link>
                </Flex>
            </CardBody>
        </Card>
    );
};
