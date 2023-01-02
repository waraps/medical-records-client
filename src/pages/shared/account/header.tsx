import React from 'react';
import { Avatar, Flex, Text, useColorModeValue } from '@chakra-ui/react';

interface IHeader {
    avatarImage: string;
    name: string;
    email: string;
}

export const Header = (props: IHeader): JSX.Element => {
    const { avatarImage, name, email } = props;
    const borderProfileColor = useColorModeValue('white', 'rgba(255, 255, 255, 0.31)');

    return (
        <Flex
            direction={{ sm: 'column', md: 'row' }}
            mb='1.5rem'
            maxH='330px'
            w={{ sm: '100%', xl: '100%' }}
            justifyContent={{ sm: 'center', md: 'space-between' }}
            align='center'
            backdropFilter='saturate(200%) blur(50px)'
            boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
            border='2px solid'
            borderColor={borderProfileColor}
            bgGradient={'linear(to-r, #628363, #4b664c)'}
            p='24px'
            borderRadius='20px'
        >
            <Flex
                align='center'
                mb={{ sm: '10px', md: '0px' }}
                direction={{ sm: 'column', md: 'row' }}
                w={{ sm: '100%' }}
                textAlign={{ sm: 'center', md: 'start' }}
            >
                <Avatar
                    me={{ md: '22px' }}
                    src={avatarImage}
                    w='90px'
                    h='90px'
                    p={'0.5'}
                    borderRadius='15px'
                    backgroundColor={'primary.50'}
                />
                <Flex direction='column' maxWidth='100%' my={{ sm: '14px' }}>
                    <Text
                        fontSize={{ sm: 'xl', lg: '3xl' }}
                        color={'white'}
                        fontWeight='bold'
                        ms={{ sm: '8px', md: '0px' }}>
                        {name}
                    </Text>
                    <Text
                        fontSize={{ sm: 'sm', md: 'md' }}
                        color={'white'}
                        fontWeight='semibold'>
                        {email}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};
