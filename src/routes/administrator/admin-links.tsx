import { IMenu } from '../../interfaces';
import { IoMedkitOutline, IoNewspaperOutline, IoPawOutline, IoPeopleOutline, IoPersonCircleOutline } from 'react-icons/io5';
import {FaCat, FaClipboard, FaClipboardList, FaDog, FaUserPlus} from 'react-icons/fa';
import { HiClock } from 'react-icons/hi';

export const links: IMenu[] = [
    {   name: 'Sala de Espera', 
        link: '/', 
        icon: IoMedkitOutline, 
        children: [
            { name: 'Pacientes en Sala', link: '/', icon: HiClock },
            { name: 'Enviar Paciente a Sala', link: '/enviar-a-sala', icon: FaDog },
        ] 
    },
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
    { name: 'Examenes', link: '/examenes', icon: IoNewspaperOutline },
    {
        name: 'Usuarios',
        link: '/usuarios',
        icon: IoPeopleOutline,
        children: [
            { name: 'Lista de Usuarios', link: '/usuarios', icon: FaClipboardList },
            { name: 'Agregar Usuario', link: '/agregar/usuario', icon: FaUserPlus },
        ],
    },
    { name: 'Perfil', link: '/perfil', icon: IoPersonCircleOutline },
];
