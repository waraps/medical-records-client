import React, { useRef } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';

interface IAlertPassword {
    isOpen: boolean;
    onClose: () => void;
}

export const AlertPassword = (props: IAlertPassword): JSX.Element => {
    const { isOpen, onClose } = props;
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        ¡Aviso!
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Las nuevas contraseñas deben coindicir
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button backgroundColor={'secondary.400'} _hover={{ backgroundColor: 'secondary.300' }} onClick={onClose} color={'white'}>
                            Aceptar
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
