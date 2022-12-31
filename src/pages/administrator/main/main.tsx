import React from 'react';
import { Avatar, Flex, Grid, Text, useColorModeValue } from '@chakra-ui/react';
import { StatisticsCard } from '../../../components';
import { useAppSelector } from '../../../state/hooks';

export const AdminMain = () => {
    const { user } = useAppSelector(state => state.user);
    const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`;
    const borderProfileColor = useColorModeValue('white', 'rgba(255, 255, 255, 0.31)');

    return (
        <Flex direction='column'>
            <Flex
                direction={{ sm: 'column', md: 'row' }}
                mb='1.5rem'
                maxH='330px'
                w={{ sm: '100%', xl: '100%' }}
                justifyContent={{ sm: 'center', md: 'space-between' }}
                align='center'
                backdropFilter='saturate(200%) blur(50px)'
                boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
                border='2px solid'
                borderColor={borderProfileColor}
                bgGradient={'linear(to-r, #47489d, #37387b)'}
                p='24px'
                borderRadius='20px'
            >
                <Flex
                    align='center'
                    mb={{ sm: '10px', md: '0px' }}
                    direction={{ sm: 'column', md: 'row' }}
                    w={{ sm: '100%' }}
                    textAlign={{ sm: 'center', md: 'start' }}
                >
                    <Avatar
                        me={{ md: '22px' }}
                        src={user?.avatar}
                        w='90px'
                        h='90px'
                        borderRadius='15px'
                    />
                    <Flex direction='column' maxWidth='100%' my={{ sm: '14px' }}>
                        <Text
                            fontSize={'5xl'}
                            color={'white'}
                            fontWeight='bold'
                            ms={{ sm: '8px', md: '0px' }}>
                            Hola 👋
                        </Text>
                        <Text
                            fontSize={'sm'}
                            color={'white'}
                            fontWeight='semibold'>
                            {fullName}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Grid templateColumns={{ sm: '1fr', xl: 'repeat(3, 1fr)' }} gap='22px'>
                <StatisticsCard
                    title='Sala de Espera'
                    description='Cantidad de mascotas en sala de espera actualmente'
                    statistic='20'
                />
                <StatisticsCard
                    title='Pacientes'
                    description='Cantidad de mascotas registradas hasta la fecha'
                    statistic='20'
                />
                <StatisticsCard
                    title='Propietarios'
                    description='Cantidad de propietarios de mascotas registrados hasta la fecha'
                    statistic='20'
                />
                <StatisticsCard
                    title='Usuarios'
                    description='Cantidad de usuarios registrados hasta la fecha'
                    statistic='20'
                />
                <StatisticsCard
                    title='Exámenes'
                    description='Cantidad de tipos de exámenes registrados hasta la fecha'
                    statistic='20'
                />
            </Grid>
        </Flex>
    );
};
