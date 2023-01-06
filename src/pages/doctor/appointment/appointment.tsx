import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../state/hooks';
import { format } from 'date-fns';
import { getPetSex } from '../../../tools';

export const Appointment = () => {
    const { appointment } = useAppSelector(state => state.appointment);
    const date = appointment?.createdAt ? new Date(appointment?.createdAt) : new Date();
    const birth = appointment?.patient ? new Date(appointment?.patient.birth) : new Date();
    const doctor = appointment?.doctor ? `${appointment?.doctor.first_name} ${appointment?.doctor.last_name}` : '';
    const owner = appointment?.doctor ? `${appointment?.patient.owner.first_name} ${appointment?.patient.owner.first_name}` : '';

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Consulta en progreso
            </Heading>
            <Text>Fecha: {format(date, 'dd/LL/yyyy')} </Text>
            <Text>Medico: {doctor}</Text>
            <Text>Historia: # {appointment?.patient.id}</Text>
            <Text>Propietario: {owner}</Text>
            <Text>Nombre: {appointment?.patient.name}</Text>
            <Text>Especie: {appointment?.patient.specie}</Text>
            <Text>Raza: {appointment?.patient.race}</Text>
            <Text>Fecha de Nacimiento: {format(birth, 'dd/LL/yyyy')} </Text>
            <Text>Color: {appointment?.patient.color}</Text>
            <Text>Sexo: {getPetSex(appointment?.patient.sex_id || 0)} </Text>
            <Text>Castrado?: {appointment?.patient.neutered ? 'Si' : 'No'} </Text>
        </>
    );
};
