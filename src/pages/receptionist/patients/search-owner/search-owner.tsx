import React from 'react';
import { Box, Button, Flex, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { searchOwnerSchema, searchOwnerSchemaType } from './search-owner-schema';
import { yupResolver } from '@hookform/resolvers/yup';

interface ISearchOwnner {
    onSubmit: (schema: searchOwnerSchemaType) => void;
    loading?: boolean;
}

export const SearchOwner = ({ onSubmit, loading }: ISearchOwnner): JSX.Element => {

    const { register, handleSubmit, formState: { errors, isDirty } } = useForm<searchOwnerSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(searchOwnerSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            dni: '',
        }
    });

    return (
        <Box w={{ base: 'full', lg: '2xl', md: 'l' }} mb={'2'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex>
                    <FormControl isInvalid={!!errors?.dni?.message}  isRequired>
                        <Input type='number' placeholder={'Ingresar cédula del propietario'}
                            focusBorderColor='primary.400' bg={'white'}
                            variant={'outline'} disabled={loading}
                            {...register('dni', { required: true })}
                        />
                        <FormErrorMessage>
                            {errors.dni && errors.dni.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Button ml={2}
                        bg={'primary.400'} color={'white'} _hover={{bg: 'primary.600'}}
                        isLoading={loading} disabled={!isDirty} size={'sm'}
                        type='submit' px={'5'} py={'5'}
                    >
                        Iniciar registro
                    </Button>
                </Flex>
            </form>
        </Box>
    );
};
