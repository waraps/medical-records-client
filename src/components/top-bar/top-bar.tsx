import React from 'react';
import {
    Avatar, Box, Flex, FlexProps, HStack, IconButton, Menu,
    MenuButton, MenuDivider, MenuItem, MenuList,
    Text, VStack, useColorModeValue
} from '@chakra-ui/react';

import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { signout } from '../../state/auth';
import { resetUserState } from '../../state/user';
import { useNavigate } from 'react-router-dom';

import avatar from '../../assets/avatars/avatar.webp';

interface ITopBar extends FlexProps {
    onOpen: () => void;
}

export const TopBar = ({ onOpen, ...rest }: ITopBar): JSX.Element => {
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = async (): Promise<void> => {
        dispatch(signout());
        dispatch(resetUserState());
    };

    const userType: string = user?.rol_id === 2 ? 'Doctor' : user?.rol_id === 3 ? 'Recepcionista' : 'Administrador';

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    showBorder={true}
                                    borderColor={'primary.100'}
                                    size={'md'}
                                    src={ user?.avatar || avatar }
                                    p='0.5'
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm" color={'primary.700'}>{user?.first_name} {user?.last_name.charAt(0)}.</Text>
                                    <Text fontSize="xs" color="primary.400">
                                        {userType}
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem onClick={() => navigate('/cuenta')} color={'primary.400'}>Cuenta</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logout} color={'primary.400'}>Cerrar Sesión</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
