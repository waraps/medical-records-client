import React from 'react';
import { Box, Collapse, Flex, FlexProps, Icon, useDisclosure } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BsCircleFill } from 'react-icons/bs';
import { NavItem } from './nav-item';
import { ILinkItem } from '../../interfaces';

interface IDropDownItem extends FlexProps {
    icon: IconType;
    title: string;
    childrens: ILinkItem[];
}

export const DropDownItem = ({ icon, title, childrens }: IDropDownItem): JSX.Element => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                onClick={onToggle}
                align="center"
                justify={'space-between'}
                p="4"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'primary.400',
                    color: 'white',
                }}
                color={'primary.700'}
            >
                <Flex align="center">
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        color={'primary.400'}
                        as={icon}
                    />
                    {title}
                </Flex>
                <Icon
                    _groupHover={{
                        color: 'white',
                    }}
                    color={'primary.400'}
                    as={isOpen ? FiChevronUp : FiChevronDown}
                />
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                {childrens.map((link) => (
                    link.childrens ?
                        <DropDownItem key={link.name} title={link.name} icon={link.icon} childrens={link.childrens} />
                        :
                        <NavItem key={link.name} icon={BsCircleFill} path={link.path || '#'} isChildren>
                            {link.name}
                        </NavItem>
                ))}

            </Collapse>
        </Box>
    );
};
