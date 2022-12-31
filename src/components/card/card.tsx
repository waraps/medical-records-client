import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface ICard extends BoxProps {
    children: ReactNode;
}

export const Card = (props: ICard): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <Box bg={'white'} borderRadius={'2xl'} {...rest}>
            {children}
        </Box>
    );
};
