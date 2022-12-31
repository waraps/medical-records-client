import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface INavItem extends FlexProps {
    icon?: IconType;
    path: string;
    children: string;
    isChildren?: boolean;
}

export const NavItem = ({ icon, path, children, isChildren }: INavItem): JSX.Element => {
    return (
        <Link to={path}>
            <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    px="4"
                    py="3"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: 'primary.400',
                        color: 'white',
                    }}
                    color={'primary.700'}
                >
                    {icon && (
                        <Icon
                            mr={isChildren ? '6' : '4'}
                            ml={isChildren ? '1' : undefined}
                            fontSize={isChildren ? '5' : '16'}
                            _groupHover={{
                                color: 'white',
                            }}
                            color={'primary.400'}
                            as={icon}
                        />
                    )}
                    {children}
                </Flex>
            </Box>
        </Link>
    );
};
