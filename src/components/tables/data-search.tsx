import React from 'react';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';

interface IDataSearch {
    value: string;
    setValue: (newValue: string) => void;
    title?: string;
    disabled?: boolean;
}

export const DataSearch = ({ value, setValue, title, disabled }: IDataSearch): JSX.Element => {
    return (
        <Box w={{ base: 'full', lg: '2xl', md: 'l' }} mb={'2'}>
            <InputGroup>
                <InputLeftElement color='gray.400'>
                    <IoSearchOutline />
                </InputLeftElement>
                <Input type='search' placeholder={title || 'Buscar'} value={value}
                    focusBorderColor='primary.400' bg={'white'}
                    variant={'outline'} disabled={disabled}
                    onChange={(e) => setValue(e.target.value)}
                />
            </InputGroup>
        </Box>
    );
};
