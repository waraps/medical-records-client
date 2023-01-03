import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Card, CardBody, CardHeader } from '../card';

interface IStatisticsCard {
    title: string;
    description: string;
    statistic: number;
}

export const StatisticsCard = (props: IStatisticsCard): JSX.Element => {
    const { title, description, statistic } = props;

    return (
        <Card p='16px' my={{ sm: '24px', xl: '0px' }}>
            <CardHeader p='6px 5px' mb='6px'>
                <Text fontSize='2xl' color={'primary.600'} fontWeight='bold'>
                    {title}
                </Text>
            </CardHeader>
            <CardBody>
                <Flex direction='column'>
                    <Text fontSize='md' color='primary.300' fontWeight='400'>
                        {description}
                    </Text>
                    <Flex align='center' mb='18px'>
                        <Text fontSize='5xl' color='primary.600' fontWeight='600'>
                            {statistic}
                        </Text>
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
};
