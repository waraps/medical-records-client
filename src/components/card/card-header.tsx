import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface ICardHeader extends BoxProps {
    children: ReactNode;
}

export const CardHeader = (props: ICardHeader): JSX.Element => {
    const { children, ...rest } = props;
    return (
        <Box {...rest}>
            {children}
        </Box>
    );
};
