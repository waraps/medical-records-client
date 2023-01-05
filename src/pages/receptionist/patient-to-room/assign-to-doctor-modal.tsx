import React, { useEffect, useRef, useState } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Select, useToast } from '@chakra-ui/react';
import { useFetch, usePost } from '../../../hooks';
import { IAppointment, IUser } from '../../../interfaces';
import { IAppointmentReq } from '../../../interfaces/network/req/IAppointmentReq';
import { AppointmentStatusConstants } from '../../../constants';

interface IAlertPassword {
    isOpen: boolean;
    onClose: () => void;
    patient: number;
}

export const AlertAssignToDoctor = (props: IAlertPassword): JSX.Element => {
    const toast = useToast();
    const { isOpen, onClose, patient } = props;
    const cancelRef = useRef<HTMLButtonElement>(null);

    const [showAssign, setShowAssign] = useState<boolean>(false);

    const { loading: loadingDoctor, error: errorDoctor, data: doctors} = useFetch<IUser[]>('/users/doctors');
    const [doctor, setDoctor] = useState<number | undefined>(doctors ? doctors[0].id : undefined);

    const { doRequest, loading, error, data } = usePost<IAppointment, IAppointmentReq>('/medical-appointment');

    const sendPatientToRoom = (): void => {
        if(doctor) {
            doRequest({ patient_id: patient, status: AppointmentStatusConstants.WAITING, doctor_id: doctor });
        } else {
            doRequest({ patient_id: patient, status: AppointmentStatusConstants.WAITING });
        }
        onClose();
    };

    const AssignComponent = (): JSX.Element => {
        return (
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Seleccione a un doctor
                </AlertDialogHeader>

                <AlertDialogBody>
                    <Select value={doctor} onChange={e => setDoctor(Number(e.target.value))}
                        focusBorderColor='primary.400' bg={'white'} variant={'outline'}
                    >
                        <option key={0} value={undefined} className={'capitalize'}>Ver doctores</option>;
                        {doctors?.map(doctor => {
                            return <option key={doctor.id} value={doctor.id} className={'capitalize'}>{`${doctor.first_name} ${doctor.last_name}`}</option>;
                        })}
                    </Select>
                </AlertDialogBody>

                <AlertDialogFooter>
                    <Button disabled={!Boolean(doctor)} color={'white'} backgroundColor={'secondary.300'} _hover={{ backgroundColor: 'secondary.300' }} onClick={sendPatientToRoom} ml={3}>
                        Seleccionar
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        );
    };

    useEffect(() => {
        if (!loading && data) {
            toast({
                description: 'Paciente enviado a sala exitosamente',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
        if (!loading && Boolean(error)) {
            let message: string = error?.message || 'Error al enviar mascota a sala';
            if(error?.message === 'Patient is in an appointment already') {
                message = 'El paciente se encuentra en sala de espera o ya esta en consulta';
            }
            toast({
                description: message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }

    }, [loading]);

    useEffect(() => {
        if (!loadingDoctor && Boolean(errorDoctor)) {

            toast({
                description: error?.message || 'Error al cargar a los doctores',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right',
            });
        }

    }, [loadingDoctor]);

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
            onCloseComplete={() => {
                setShowAssign(false);
                setDoctor(undefined);
            }}
        >
            <AlertDialogOverlay>
                {
                    showAssign ?
                        <AssignComponent /> :
                        (
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    ¿Desea asignar este paciente a un doctor?
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={sendPatientToRoom}>
                                        No
                                    </Button>
                                    <Button color={'white'} backgroundColor={'primary.300'} _hover={{ backgroundColor: 'primary.300' }} onClick={() => setShowAssign(true)} ml={3}>
                                        Si
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        )
                }
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
