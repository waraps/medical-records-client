import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';
import { useFetch } from '../../../../../hooks';
import { IMedicalAppointmentReq, IUser } from '../../../../../interfaces';
import { ISendToRoom } from '../pet-list';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
    },
};

interface IPickADoctorModal {
    openModal: boolean;
    closeModal: () => void;
    sendToRoom: ISendToRoom; 
    sendPatient: (sendToRoom: IMedicalAppointmentReq) => void;
}

export const PickADoctorModal = (props: IPickADoctorModal): JSX.Element => {
    const { openModal, closeModal, sendToRoom, sendPatient } = props;
    const [assing, setAssing] = useState<boolean>(false);
    const [doctorId, setDoctorId] = useState<number | undefined>(undefined);

    const { loading, data: doctors } = useFetch<IUser[]>('/users/doctors');

    const onCloseModal = (): void => {
        setAssing(false);
        closeModal();
    };

    const handleChange = (e: React.FormEvent<HTMLSelectElement>): void => {
        setDoctorId(Number(e.currentTarget.value));
        console.log(e.currentTarget.value);
    };

    const onSend = (): void => {
        if(doctorId) {
            sendPatient({...sendToRoom, user_id: doctorId ? doctorId : undefined});
        } else {
            sendPatient(sendToRoom);
        }
        setDoctorId(undefined);
        setAssing(false);
        closeModal();
    };

    return (
        <Modal
            isOpen={openModal}
            onRequestClose={onCloseModal}
            style={{...customStyles, overlay: { backgroundColor: 'rgba(0,0,0,0.5)' }}}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
        > 
            <div>
                <button onClick={onCloseModal} className='absolute top-4 right-4 bg-red-500 rounded-full p-1'>
                    <IoClose color='white' size={20} />
                </button>
                <div className="w-full flex flex-col justify-center items-center mt-10 px-3">
                    {
                        assing ? (
                            <>
                                <div className='w-full flex flex-col my-5'>
                                    <select
                                        value={doctorId} onChange={handleChange}
                                        disabled={loading} className='appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                                        <option value={undefined}>Elije a un Medico Veterinario</option>
                                        {doctors?.map(doctor => {
                                            return <option key={doctor.id} value={doctor.id} className={'capitalize'}>{`${doctor.first_name} ${doctor.last_name}`}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className='flex'>
                                    <button className='m-2 px-8 py-3 rounded-lg bg-primary-pruple-300 text-white' 
                                        onClick={onSend}
                                    >
                                        Asignar
                                    </button>
                                    <button className='m-2 px-8 py-3 rounded-lg bg-primary-green-500 text-white' 
                                        onClick={() => {
                                            setAssing(false);
                                            setDoctorId(undefined);
                                        }}
                                    >
                                        Regresar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className='my-5'>¿Deseas asignarle esta consulta a un Medico Veterianrio?</p>
                                <div className='flex'>
                                    <button onClick={() => setAssing(true)} className='m-2 px-8 py-3 rounded-lg bg-primary-green-500 text-white'>Si</button>
                                    <button onClick={onSend} className='m-2 px-8 py-3 rounded-lg bg-red-500 text-white'>No</button>
                                </div>
                            </>
                        )
                    }
                </div>
                
            </div>
        </Modal>
    );
};