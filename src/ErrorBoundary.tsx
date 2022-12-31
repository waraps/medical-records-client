import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
        console.error('getDerivedStateFromError:', error);
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Flex color={'secondary.400'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Heading as='h2' size='md'>Vaya, eso fue inesperado 😕</Heading>
                    <Heading as='h3' size='sm' my={2}>Ocurrió un error al tratar de cargar la información.</Heading>
                    <Button
                        bg={'primary.400'} color={'white'} _hover={{bg: 'primary.300'}}
                        mt={2} size={'sm'} onClick={() => location.reload()}

                    >
                        Recargar
                    </Button>
                </Flex>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
