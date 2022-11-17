import { IMenu } from '../../interfaces';
import { IoMedkitOutline, IoNewspaperOutline, IoPawOutline, IoPeopleOutline, IoPersonCircleOutline } from 'react-icons/io5';
import {FaCat, FaClipboard, FaClipboardList, FaUserPlus} from 'react-icons/fa';

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
