import { IMenu } from '../../interfaces';
import { IoMedkitOutline, IoPawOutline, IoPersonCircleOutline } from 'react-icons/io5';

export const links: IMenu[] = [
    { name: 'Sala de Espera', link: '/', icon: IoMedkitOutline },
    { name: 'Pacientes', link: '/pacientes', icon: IoPawOutline },
    { name: 'Perfil', link: '/perfil', icon: IoPersonCircleOutline },
];
