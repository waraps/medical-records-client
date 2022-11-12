import { IconType } from 'react-icons';

export interface IMenu {
  name: string
  link: string
  icon: IconType
  children?: IMenu[]
}
