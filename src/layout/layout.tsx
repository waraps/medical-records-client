import React, { useEffect } from 'react';
import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

// Components
import { Footer, Sidebar, TopBar } from '../components';
import { ILinkItem } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { me } from '../state/user';

interface ILayout {
    links: ILinkItem[];
}

export const Layout = (props: ILayout): JSX.Element => {
    const dispatch = useAppDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {links} = props;

    const { user } = useAppSelector(state => state.user);

    useEffect(() => {
        if(!Boolean(user)) {
            dispatch(me());
        }
    }, []);


    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <Sidebar
                LinkItems={links}
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="sm">
                <DrawerContent>
                    <Sidebar LinkItems={links} onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* nav */}
            <TopBar onOpen={onOpen}/>
            <Box ml={{ base: 0, md: 60 }}>
                <Box p="4" minH="88.5vh">
                    <Outlet />
                </Box>
                <Footer />
            </Box>
        </Box>
    );
};
