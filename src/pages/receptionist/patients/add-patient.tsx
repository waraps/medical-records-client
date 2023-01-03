import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, useToast, useDisclosure } from '@chakra-ui/react';

import { SearchOwner } from './search-owner';
import { searchOwnerSchemaType } from './search-owner/search-owner-schema';
import { useFetch, usePost } from '../../../hooks';
import { IOwner } from '../../../interfaces/network/res/IOwner';
import { IOwnerReq, IPatient, IPatientReq, IPetSex } from '../../../interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { addPatientSchema, addPatientSchemaType } from './add-patient-schema';
import { getPetSex } from '../../../tools';
import { format } from 'date-fns';

export const AddPatient = () => {
    const [ownerDNI, setOwnerDNI] = useState<string>('');
    const [existOwner, setExistOwner] = useState<boolean>(false);

    const { fetchData, loading: loadingOwner, error: errorOwner, data: owner} = useFetch<IOwner>('', undefined, false);
    const { loading, data, doRequest, error } = usePost<IOwner, IOwnerReq & IPatientReq>('/owners');
    const { loading: loadingPatient, data: patient, doRequest: createPatient, error: errorPatient } = usePost<IPatient, IPatientReq>('/patients');
    const { fetchData: fetchSexes, data: sexes } = useFetch<IPetSex[]>('/pet_sex', undefined, false);

    const { isOpen, onToggle } = useDisclosure();
    const toast = useToast();

    useEffect(() => fetchSexes(), []);

    const onSearchOwner = (schema: searchOwnerSchemaType): void => {
        setOwnerDNI(schema.dni);
        fetchData(`/owners/dni/${schema.dni}`);
        onToggle();
    };

    useEffect(() => {
        if (!loadingOwner && Boolean(errorOwner)) {
            toast({
                description: errorOwner?.message || 'Ha ocurrido un error',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
            onToggle();
        }

    }, [loadingOwner]);

    const { register, handleSubmit, formState: { errors, isDirty }, reset, watch } = useForm<addPatientSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(addPatientSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            // owner
            first_name: '',
            last_name: '',
            dni: '',
            address: '',
            phone: '',
            email: '',
            occupation: '',
            housing: '',
            other_pets: false,

            // patient
            specie: '',
            race: '',
            name: '',
            birth: format(new Date(), 'dd/LL/yyyy'),
            color: '',
            sex_id: 1,
            neutered: false,
        }
    });

    useEffect(() => {
        if (owner) {
            setExistOwner(true);
        }

        reset({
            first_name: owner?.first_name || '',
            last_name: owner?.last_name || '',
            dni: owner?.dni || ownerDNI,
            address: owner?.address || '',
            phone: owner?.phone || '',
            email: owner?.email || '',
            occupation: owner?.occupation || '',
            housing: owner?.housing || '',
            other_pets: owner?.other_pets || false,
        });
    }, [owner]);

    const onSubmit = (schema: addPatientSchemaType): void => {
        if(owner?.id) {
            const patient: IPatientReq = {
                specie: schema.specie,
                race: schema.race,
                name: schema.name,
                birth: new Date(schema.birth),
                color: schema.color,
                sex_id: schema.sex_id,
                neutered: schema.neutered,
                owner_id: owner.id,
            };
            createPatient(patient);
        } else {
            const ownerPatient: IOwnerReq & IPatientReq = {
                // owner
                first_name: schema.first_name,
                last_name: schema.last_name,
                dni: schema.dni,
                address: schema.address,
                phone: schema.phone,
                email: schema.email,
                occupation: schema.occupation,
                housing: schema.housing,
                other_pets: schema.other_pets,

                // patient
                specie: schema.specie,
                race: schema.race,
                name: schema.name,
                birth: new Date(schema.birth),
                color: schema.color,
                sex_id: schema.sex_id,
                neutered: schema.neutered,
            };
            doRequest(ownerPatient);
        }
    };

    useEffect(() => {
        if(!loading && data) {
            reset({
                // owner
                first_name: '',
                last_name: '',
                dni: '',
                address: '',
                phone: '',
                email: '',
                occupation: '',
                housing: '',
                other_pets: false,

                // patient
                specie: '',
                race: '',
                name: '',
                birth: format(new Date(), 'dd/LL/yyyy'),
                color: '',
                sex_id: 0,
                neutered: false,
            });
            onToggle();
            toast({
                description: 'Paciente registrado exitosamente',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }

        if(!loading && Boolean(error)){
            toast({
                description: error?.message || 'Error registrando paciente',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loading]);

    useEffect(() => {
        if(!loadingPatient && patient) {
            reset({
                // owner
                first_name: '',
                last_name: '',
                dni: '',
                address: '',
                phone: '',
                email: '',
                occupation: '',
                housing: '',
                other_pets: false,

                // patient
                specie: '',
                race: '',
                name: '',
                birth: format(new Date(), 'dd/LL/yyyy'),
                color: '',
                sex_id: 1,
                neutered: false,
            });
            onToggle();
            toast({
                description: 'Paciente registrado exitosamente',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }

        if(!loadingPatient && Boolean(errorPatient)){
            toast({
                description: errorPatient?.message || 'Error registrando paciente',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    }, [loadingPatient]);

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Nuevo Paciente
            </Heading>
            {
                !isOpen ?
                    <SearchOwner onSubmit={onSearchOwner} /> : (
                        <Box py={{ base: '0', sm: '8' }} px={{ base: '4', sm: '10' }}
                            bg={'white'} borderRadius={{ base: 'none', sm: 'xl' }}
                        >
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/**Owner */}
                                <Box mb={2}>
                                    <Text noOfLines={1} fontSize={'xl'} fontWeight={'bold'}>Datos Cliente</Text>
                                </Box>
                                <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                                    <FormControl isInvalid={!!errors?.first_name?.message} mt={2} isRequired isReadOnly={existOwner}>
                                        <FormLabel htmlFor="email" color="primary.600">Nombre</FormLabel>
                                        <Input
                                            id="first_name"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('first_name', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.first_name && errors.first_name.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl ml={{base: 'none', md: 2}} isInvalid={!!errors?.last_name?.message} mt={2} isRequired isReadOnly={existOwner}>
                                        <FormLabel htmlFor="last_name" color="primary.600">Apellido</FormLabel>
                                        <Input
                                            id="last_name"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('last_name', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.last_name && errors.last_name.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                                    <FormControl isInvalid={!!errors?.dni?.message} mt={2}  isRequired isReadOnly={existOwner}>
                                        <FormLabel htmlFor="dni" color="primary.600">C.I</FormLabel>
                                        <Input
                                            id="dni"
                                            type="number"
                                            focusBorderColor='primary.400'
                                            {...register('dni', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.dni && errors.dni.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl mx={{base: 'none', md: 2}} isInvalid={!!errors?.phone?.message} mt={2} isRequired isReadOnly={existOwner}>
                                        <FormLabel htmlFor="phone" color="primary.600">Teléfono</FormLabel>
                                        <Input
                                            id="phone"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('phone', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.phone && errors.phone.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl mx={{base: 'none', md: 2}} isInvalid={!!errors?.email?.message} mt={2} isRequired isReadOnly={existOwner}>
                                        <FormLabel htmlFor="email" color="primary.600">Correo</FormLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            focusBorderColor='primary.400'
                                            {...register('email', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.email && errors.email.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                                    <FormControl isInvalid={!!errors?.address?.message} mt={2} isRequired isReadOnly={existOwner}>
                                        <FormLabel htmlFor="address" color="primary.600">Dirección</FormLabel>
                                        <Input
                                            id="address"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('address', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.address && errors.address.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                                    <FormControl isInvalid={!!errors?.housing?.message} mt={2} isRequired isReadOnly={existOwner}>
                                        <FormLabel htmlFor="housing" color="primary.600">Tipo de Vivienda</FormLabel>
                                        <Input
                                            id="housing"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('housing', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.housing && errors.housing.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl mx={{base: 'none', md: 2}} isInvalid={!!errors?.phone?.message} mt={2} isRequired isReadOnly={existOwner}>
                                        <FormLabel htmlFor="occupation" color="primary.600">Ocupación</FormLabel>
                                        <Input
                                            id="occupation"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('occupation', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.occupation && errors.occupation.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl mt={2}>
                                        <FormLabel htmlFor="other_pets" color="primary.600" mb={4}>¿Posee más de una mascota?</FormLabel>
                                        <Checkbox id="other_pets" {...register('other_pets', { required: true })} isRequired isReadOnly={existOwner} mx={1}>{watch('other_pets') ? 'Si' : 'No'}</Checkbox>
                                        <FormErrorMessage>
                                            {errors.other_pets && errors.other_pets.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>

                                {/**Patient */}
                                <Box mt={10} mb={2}>
                                    <Text noOfLines={1} fontSize={'xl'} fontWeight={'bold'}>Datos Paciente</Text>
                                </Box>
                                <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                                    <FormControl isInvalid={!!errors?.name?.message} mt={2} isRequired>
                                        <FormLabel htmlFor="name" color="primary.600">Nombre</FormLabel>
                                        <Input
                                            id="name"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('name', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.name && errors.name.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                                    <FormControl isInvalid={!!errors?.specie?.message} mt={2} isRequired>
                                        <FormLabel htmlFor="specie" color="primary.600">Especie</FormLabel>
                                        <Input
                                            id="specie"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('specie', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.specie && errors.specie.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl ml={{base: 'none', md: 2}} isInvalid={!!errors?.race?.message} mt={2} isRequired>
                                        <FormLabel htmlFor="race" color="primary.600">Raza</FormLabel>
                                        <Input
                                            id="race"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('race', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.race && errors.race.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <Flex flexDirection={{ base: 'column', md: 'row'}} my={1}>
                                    <FormControl isInvalid={!!errors?.color?.message} mt={2} isRequired>
                                        <FormLabel htmlFor="color" color="primary.600">Color</FormLabel>
                                        <Input
                                            id="color"
                                            type="text"
                                            focusBorderColor='primary.400'
                                            {...register('color', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.color && errors.color.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl mx={{base: 'none', md: 2}} mt={2} isInvalid={!!errors?.sex_id?.message} isRequired>
                                        <FormLabel htmlFor="sex_id" color="primary.600">Sexo</FormLabel>
                                        <Select {...register('sex_id', { required: true })}
                                            focusBorderColor='primary.400' bg={'white'} variant={'outline'}
                                        >
                                            {sexes?.map(sex => {
                                                return <option key={sex.id} value={sex.id} className={'capitalize'}>{getPetSex(sex.id)}</option>;
                                            })}
                                        </Select>
                                        <FormErrorMessage>
                                            {errors.sex_id && errors.sex_id.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl mx={{base: 'none', md: 2}} mt={2} isInvalid={!!errors?.birth?.message} isRequired>
                                        <FormLabel htmlFor="date" color="primary.600">Nacimiento</FormLabel>
                                        <Input id="date"
                                            type="date"
                                            focusBorderColor='primary.400'
                                            {...register('birth', { required: true })}
                                        />
                                        <FormErrorMessage>
                                            {errors.birth && errors.birth.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl mt={2} isInvalid={!!errors?.neutered?.message} isRequired>
                                        <FormLabel htmlFor="neutered" color="primary.600" mb={4}>Esterilizado</FormLabel>
                                        <Checkbox id="neutered" {...register('neutered', { required: true })} mx={1}>{watch('neutered') ? 'Si' : 'No'}</Checkbox>
                                        <FormErrorMessage>
                                            {errors.neutered && errors.neutered.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <Flex justifyContent={'flex-end'}>
                                    <Button type='submit' mt={5} disabled={!isDirty} bg={'primary.400'} color={'white'} _hover={{bg: 'primary.500'}}>
                                        Registar
                                    </Button>
                                </Flex>
                            </form>
                        </Box>
                    )
            }
        </>
    );
};
