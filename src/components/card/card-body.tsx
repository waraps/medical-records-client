import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface ICardBody extends BoxProps {
    children: ReactNode;
}

export const CardBody = (props: ICardBody): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <Box {...rest}>
            {children}
        </Box>
    );
};
