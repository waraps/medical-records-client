import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../state/hooks';
import { format } from 'date-fns';

export const Appointment = () => {
    const { appointment } = useAppSelector(state => state.appointment);
    const date = appointment?.createdAt ? new Date(appointment?.createdAt) : new Date();

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Consulta en progreso
            </Heading>
            <Text>Fecha: {format(date, 'dd/LL/yyyy')} </Text>
            <Text>
                {
                    appointment?.doctor ?
                        `Medico: ${appointment?.doctor.first_name} ${appointment?.doctor.last_name}` :
                        ''
                }
            </Text>
        </>
    );
};
