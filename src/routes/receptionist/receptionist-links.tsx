import { IMenu } from '../../interfaces';
import { IoMedkitOutline, IoPawOutline, IoPersonCircleOutline } from 'react-icons/io5';
import {FaCat, FaClipboard, FaClipboardList } from 'react-icons/fa';

export const links: IMenu[] = [
    { name: 'Sala de Espera', link: '/', icon: IoMedkitOutline },
    {
        name: 'Pacientes',
        link: '/pacientes',
        icon: IoPawOutline,
        children: [
            { name: 'Agregar Paciente', link: '/agregar/paciente', icon: FaCat },
            { name: 'Lista de Pacientes', link: '/pacientes', icon: FaClipboardList },
            { name: 'Lista de Propietarios', link: '/propietarios', icon: FaClipboard },
        ],
    },
    { name: 'Perfil', link: '/perfil', icon: IoPersonCircleOutline },
];
