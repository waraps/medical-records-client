import React from 'react';
import { Flex, Grid } from '@chakra-ui/react';

import { Header } from './header';
import { ProfileInformation } from './profile-information';
import { PlatformSettings } from './platform-settings';

import { useAppSelector } from '../../../state/hooks';

import avatar from '../../../assets/avatars/avatar.webp';
import { userType } from '../../../tools';
import { format } from 'date-fns';

export const Account = (): JSX.Element => {
    const { user } = useAppSelector(state => state.user);
    const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`;

    return (
        <Flex direction='column'>
            <Header
                avatarImage={ user?.avatar || avatar }
                name={fullName}
                email={user?.email || ''}
            />
            <Grid templateColumns={{ sm: '1fr', xl: 'repeat(3, 1fr)' }} gap='22px'>
                <ProfileInformation
                    title={'Información de Perfil'}
                    description={'Aquí puedes ver un resumen de los datos básicos de tu cuenta'}
                    name={fullName}
                    dni={user?.dni || ''}
                    email={user?.email || ''}
                    user_type={user?.rol_id ? userType(user?.rol_id) : ''}
                    created_At={format(user?.createdAt ? new Date(user?.createdAt) : new Date(), 'dd/LL/yyyy')}
                />
                <PlatformSettings title={'Configuración'} />
            </Grid>
        </Flex>
    );
};
