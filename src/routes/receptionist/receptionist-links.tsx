import { IMenu } from '../../interfaces';
import { IoFileTrayFullOutline, IoPawOutline, IoPersonOutline } from 'react-icons/io5';

export const links: IMenu[] = [
    { name: 'Sala de Espera', link: '/', icon: IoPawOutline },
    { name: 'Historias', link: '/historias', icon: IoFileTrayFullOutline },
    { name: 'Perfil', link: '/perfil', icon: IoPersonOutline },
];
