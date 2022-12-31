import { Box, Button, FormControl, FormErrorMessage, Heading, Input, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from '../../../components';
import { useFetch, usePost } from '../../../hooks';
import { Column } from 'react-table';
import { format } from 'date-fns';
import { ITests, ITestsReq } from '../../../interfaces';
import { testSchema, testSchemaType } from './test-schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface ITestList {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export const Tests = (): JSX.Element => {
    const { fetchData, loading, error, data: tests} = useFetch<ITests[]>('/tests', undefined, false);
    const { doRequest, loading: updateLoading, error: updateError, data: newTest } = usePost<ITests, ITestsReq>('/tests');

    const { isOpen, onToggle } = useDisclosure();
    const toast = useToast();

    const [data, setData] = useState<ITestList[]>([]);

    const { register, handleSubmit , formState: { errors } } = useForm<testSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(testSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            name: '',
        }
    });

    const onSubmit = (schema: testSchemaType): void => {
        const test: ITestsReq = {
            name: schema.name
        };

        doRequest(test);
    };

    useEffect(() => fetchData(), []);

    useEffect(() => {
        if(!updateLoading && newTest) {
            fetchData();

            toast({
                title: 'Examen agregado.',
                description: 'Se ha agregado un nuevo tipo de examen.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        }
    }, [updateLoading]);

    useEffect(() => {
        if(tests) {
            const formattedTests: ITestList[] = tests?.map(test => {
                return {
                    id: test.id,
                    name: test.name,
                    createdAt: format(new Date(test.createdAt), 'dd/LL/yyyy'),
                    updatedAt: format(new Date(test.createdAt), 'dd/LL/yyyy'),
                };
            }) || [];

            setData(formattedTests);
        }
    }, [tests]);

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

        if (!updateLoading && Boolean(updateError)) {
            toast({
                description: updateError?.message || 'Error agregando examen',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }

    }, [loading, updateLoading]);

    const columns = useMemo<Column<ITestList>[]>(() => [
        {
            id: 'id',
            Header: 'ID',
            accessor: 'id'
        },
        {
            id: 'name',
            Header: 'Nombre',
            accessor: 'name'
        },
        {
            id: 'createdAt',
            Header: 'Registrado',
            accessor: 'createdAt'
        },
    ],  []);

    return (
        <>
            <Heading as='h1' size='lg' noOfLines={1} ml={'1'} mb={'5'} >
                Tipo de Exámenes
            </Heading>
            <Box mb={2}>
                <Button variant="link" color="primary.400" size="sm" onClick={onToggle}>
                    { isOpen ? 'Ver lista' : 'Agregar nuevo' }
                </Button>
            </Box>
            {isOpen &&
                <Box w={{ base: 'full', lg: '2xl', md: 'l' }} mb={'2'}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={!!errors?.name?.message} isRequired>
                            <Input type='text' placeholder={'Nuevo examen'}
                                focusBorderColor='primary.400' bg={'white'}
                                variant={'outline'} disabled={updateLoading}
                                {...register('name', { required: true })}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            mt={4}
                            bg={'primary.400'} color={'white'} _hover={{bg: 'primary.600'}}
                            isLoading={updateLoading}
                            type='submit'
                        >
                            Agregar
                        </Button>
                    </form>
                </Box>
            }
            {!isOpen &&
                <DataTable
                    columns={columns}
                    data={data}
                    loading={loading}
                    searchTitle={'Buscar examen'}
                />
            }
        </>
    );
};
