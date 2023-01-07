import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Checkbox, CheckboxGroup, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Text, Textarea, useToast } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { format } from 'date-fns';
import { getPetSex } from '../../../tools';

import avatar from '../../../assets/avatars/avatar.webp';
import { useForm } from 'react-hook-form';
import { recordSchema, recordSchemaType } from './record-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRecord, IRecordReq, ITests } from '../../../interfaces';
import { useFetch, usePut } from '../../../hooks';
import { me } from '../../../state/user';
import { currentAppointment } from '../../../state/appointment';

export const Appointment = () => {
    const dispatch = useAppDispatch();
    const { appointment } = useAppSelector(state => state.appointment);
    const date = appointment?.createdAt ? new Date(appointment?.createdAt) : new Date();
    const birth = appointment?.patient ? new Date(appointment?.patient.birth) : new Date();
    const doctor = appointment?.doctor ? `${appointment?.doctor.first_name} ${appointment?.doctor.last_name}` : '';
    const owner = appointment?.doctor ? `${appointment?.patient.owner.first_name} ${appointment?.patient.owner.last_name}` : '';

    const toast = useToast();

    const { loading, error, data: tests} = useFetch<ITests[]>('/tests');
    const { loading: loadingRecord, data: record, doUpdate, error: errorRecord } = usePut<IRecord, IRecordReq>(`/records/${appointment?.record.id}/finish`);

    const [selectedTests, setSelectedTests] = useState<number[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<recordSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(recordSchema),
        criteriaMode: 'firstError',
        defaultValues: {
        }
    });

    const onSubmit = (schema: recordSchemaType): void => {
        const record: IRecordReq = {
            patient_id: appointment?.patient.id || 0,
            appointment_id: appointment?.id || 0,
            reason: schema.reason || '',
            revelevant_clinic: schema.revelevant_clinic || '',
            diagnosis: schema.diagnosis || '',
            treatment: schema.treatment || '',
            weight: schema.weight || 0,
            tests: selectedTests,
        };
        console.log(record);
        doUpdate(record);
    };

    useEffect(() => {
        if (!loading && Boolean(error)) {
            toast({
                description: error?.message || 'Error cargando tipos de examenes',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loading]);

    useEffect(() => {
        if (!loadingRecord && record) {
            toast({
                description: 'La consulta ha  empezado',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
            dispatch(me());
            dispatch(currentAppointment());
        }
        if (!loadingRecord && Boolean(errorRecord)) {
            toast({
                description: errorRecord?.message || 'Error terminando consulta',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loadingRecord]);

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Consulta en progreso
            </Heading>
            <Box bg={'white'} p={6} borderRadius={'lg'}>
                <Flex justifyContent={'flex-end'}>
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Historia: {appointment?.patient.id}</Text>
                </Flex>
                <Flex justifyContent={'space-between'} mt={1}>
                    <Text fontSize={'xl'}><strong>Médico: </strong>{doctor}</Text>
                    <Text fontSize={'xl'}><strong>Fecha: </strong>{format(date, 'dd/LL/yyyy')} </Text>
                </Flex>
                <Box mt={5}>
                    <Text noOfLines={1} fontSize={'xl'}>Datos del paciente</Text>
                </Box>
                <Flex mt={5}>
                    <Box mr={5}>
                        <Avatar
                            me={{ md: '22px' }}
                            src={appointment?.patient.avatar || avatar}
                            w='90px'
                            h='90px'
                            p={'0.5'}
                            borderRadius='15px'
                            backgroundColor={'primary.50'}
                        />
                    </Box>
                    <Box>
                        <Flex>
                            <Box mr={32}>
                                <Text fontSize={'lg'} my={1}><strong>Propietario: </strong>{owner}</Text>
                                <Text fontSize={'lg'} my={1}><strong>Nombre: </strong>{appointment?.patient.name}</Text>
                                <Text fontSize={'lg'} my={1}><strong>Color: </strong>{appointment?.patient.color}</Text>
                            </Box>
                            <Box>
                                <Text fontSize={'lg'} my={1}><strong>Especie: </strong>{appointment?.patient.specie}</Text>
                                <Text fontSize={'lg'} my={1}><strong>Raza: </strong>{appointment?.patient.race}</Text>
                                <Text fontSize={'lg'} my={1}><strong>Sexo: </strong>{getPetSex(appointment?.patient.sex_id || 0)}</Text>
                            </Box>
                        </Flex>
                        <Text fontSize={'lg'} my={1}><strong>¿Castrado?: </strong>{appointment?.patient.neutered ? 'Si' : 'No'} </Text>
                        <Text fontSize={'lg'} my={1}><strong>Fecha de Nacimiento: </strong>{format(birth, 'dd/LL/yyyy')}</Text>
                    </Box>
                </Flex>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box mt={10}>
                        <Text noOfLines={1} fontSize={'2xl'}>Datos consulta</Text>
                    </Box>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl mt={2}>
                            <FormLabel htmlFor="weight" color="primary.600">Peso</FormLabel>
                            <Input
                                id="weight"
                                type="number"
                                placeholder='peso de la mascota ...'
                                focusBorderColor='primary.400'
                                {...register('weight')}
                            />
                            <FormErrorMessage>
                                {errors.weight && errors.weight.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl mt={2}>
                            <FormLabel htmlFor="name" color="primary.600">Motivo de consulta</FormLabel>
                            <Textarea
                                id="name"
                                focusBorderColor='primary.400'
                                placeholder='escriba motivo de la consulta ...'
                                {...register('reason')}
                            />
                            <FormErrorMessage>
                                {errors.reason && errors.reason.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl mt={2}>
                            <FormLabel htmlFor="specie" color="primary.600">Clínica Relevante</FormLabel>
                            <Textarea
                                id="specie"
                                focusBorderColor='primary.400'
                                placeholder='escriba la clínica relevante ...'
                                {...register('revelevant_clinic')}
                            />
                            <FormErrorMessage>
                                {errors.revelevant_clinic && errors.revelevant_clinic.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl mt={2}>
                            <FormLabel htmlFor="color" color="primary.600">Diagnóstico</FormLabel>
                            <Textarea
                                id="color"
                                focusBorderColor='primary.400'
                                placeholder='escriba el diagnóstico ...'
                                {...register('diagnosis')}
                            />
                            <FormErrorMessage>
                                {errors.diagnosis && errors.diagnosis.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl mt={2}>
                            <FormLabel htmlFor="color" color="primary.600">Tratamiento</FormLabel>
                            <Textarea
                                id="color"
                                focusBorderColor='primary.400'
                                {...register('treatment')}
                                placeholder='escriba el tratamiento ...'
                            />
                            <FormErrorMessage>
                                {errors.treatment && errors.treatment.message}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                        <FormControl mt={2}>
                            <FormLabel htmlFor="color" color="primary.600">Examenes Complementarios</FormLabel>
                            <CheckboxGroup>
                                <Stack mt={2} spacing={[1, 5]} direction={['column', 'row']}>
                                    {
                                        tests?.map(test => {
                                            return <Checkbox key={test.id}>{test.name}</Checkbox>;
                                        })
                                    }
                                </Stack>
                            </CheckboxGroup>
                        </FormControl>
                    </Flex>
                    <Flex justifyContent={'flex-end'}>
                        <Button type='submit' mt={5} bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}>
                            Finalizar Consulta
                        </Button>
                    </Flex>
                </form>

            </Box>
        </>
    );
};

