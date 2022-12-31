import React from 'react';
import { Box, CloseButton, Flex, useColorModeValue, Text, BoxProps, Avatar } from '@chakra-ui/react';

// Components
import { DropDownItem } from './drop-down-item';
import { NavItem } from './nav-item';

import Logo from '../../assets/images/galenos.webp';
import { ILinkItem } from '../../interfaces';

interface ISidebar extends BoxProps {
    onClose: () => void;
    LinkItems: ILinkItem[];
}

export const Sidebar = ({ onClose, LinkItems, ...rest }: ISidebar): JSX.Element => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Flex alignItems="center">
                    <Avatar
                        size={'md'}
                        src={Logo}
                    />
                    <Text fontSize="xs" fontFamily="Poppins" fontWeight="bold" mt={'2'} ml={'2'} color={'primary.600'}>
                        Galenos Clínica Veterinaria
                    </Text>
                </Flex>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                link.childrens ?
                    <DropDownItem key={link.name} title={link.name} icon={link.icon} childrens={link.childrens} />
                    :
                    <NavItem key={link.name} icon={link.icon} path={link.path || '#'}>
                        {link.name}
                    </NavItem>
            ))}
        </Box>
    );
};
