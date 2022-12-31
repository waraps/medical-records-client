import { IconType } from 'react-icons';

export interface ILinkItem {
    name: string;
    icon: IconType;
    path?: string;
    childrens?: ILinkItem[];
}
