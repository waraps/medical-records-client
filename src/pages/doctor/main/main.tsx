import React, { useEffect } from 'react';
import { Avatar, Flex, Grid, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { StatisticsCard } from '../../../components';
import { useAppSelector } from '../../../state/hooks';
import { useFetch } from '../../../hooks';

interface IAdminStats {
    usersCount: number;
    patientsCount: number;
    ownersCount: number;
    testsCount: number;
    patientInRoomCount: number;
}

export const DoctorMain = () => {
    const { user } = useAppSelector(state => state.user);
    const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`;
    const borderProfileColor = useColorModeValue('white', 'rgba(255, 255, 255, 0.31)');
    const toast = useToast();

    const { loading, error, data} = useFetch<IAdminStats>('users/admin/stats');

    useEffect(() => {
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
                        backgroundColor={'primary.50'}
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
                    statistic={data?.patientInRoomCount || 0}
                />
                <StatisticsCard
                    title='Pacientes'
                    description='Cantidad de mascotas registradas hasta la fecha'
                    statistic={data?.patientsCount || 0}
                />
                <StatisticsCard
                    title='Propietarios'
                    description='Cantidad de propietarios de mascotas registrados hasta la fecha'
                    statistic={data?.ownersCount || 0}
                />
                <StatisticsCard
                    title='Usuarios'
                    description='Cantidad de usuarios registrados hasta la fecha'
                    statistic={data?.usersCount || 0}
                />
                <StatisticsCard
                    title='Exámenes'
                    description='Cantidad de tipos de exámenes registrados hasta la fecha'
                    statistic={data?.testsCount || 0}
                />
            </Grid>
        </Flex>
    );
};
