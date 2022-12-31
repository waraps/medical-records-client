import React from 'react';
import { Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react';

export const Footer = (): JSX.Element => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'center' }}
                align={{ base: 'center', md: 'center' }}>
                <Text fontSize="xs" fontFamily="Poppins" color={'primary.700'}>
                    &copy; {new Date().getFullYear()} Galenos Clínica Veterinaria. Todos los Derechos Reservados.
                </Text>
            </Container>
        </Box>
    );
};
