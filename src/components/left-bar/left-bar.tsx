import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthActions } from '../../redux/auth';
import { Dropdown } from '../dropdown';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoLogOutOutline } from 'react-icons/io5';
import { IMenu } from '../../interfaces';

export interface ILeftBar {
  links: IMenu[]
}

const LeftBar = ({ links }: ILeftBar): JSX.Element => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateTo = (): void => navigate('/login');
    const logout = (): void => dispatch(AuthActions.logout(navigateTo));

    return (
        <aside
            className={`bg-[#f5f5f5] border min-h-screen ${
                open ? 'w-72' : 'w-16'
            } duration-500 px-4`}
        >
            <div className="py-2 flex justify-end text-primary-pruple-900">
                <HiMenuAlt3
                    size={26}
                    className="cursor-pointer text-primary-pruple-900"
                    onClick={() => setOpen(!open)}
                />
            </div>
            <div className="mt-4 flex flex-col gap-2 relative text-primary-pruple-900">
                {links?.map((menu, i) => (
                    (menu.children != null)
                        ? <Dropdown key={menu?.link} link={menu} numberOfLink={i} openBar={open} />
                        : <Link
                            to={menu?.link}
                            key={`i-${menu.name}`}
                            className="group flex items-center text-sm gap-3.5 font-medium p-2 text-primary-pruple-900 hover:bg-primary-green-500 rounded-md hover:text-white"
                        >
                            <div>{React.createElement(menu?.icon, { size: '20' })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`
                                }}
                                className={!open ? 'whitespace-pre duration-300 hover:duration-0 delay-300 hover:whitespace-normal hover:delay-0 opacity-0 translate-x-28 overflow-hidden' : 'whitespace-pre duration-300 hover:duration-0 delay-300 hover:whitespace-normal hover:delay-0'}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={open ? 'hidden absolute left-48 bg-white font-semibold whitespace-pre text-primary-pruple-900 hover:bg-primary-green-500 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit' : 'absolute left-48 bg-white font-semibold whitespace-pre text-primary-pruple-900 hover:bg-primary-green-500 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit'}
                            >
                                {menu?.name}
                            </h2>
                        </Link>
                ))}

                <button
                    className={
                        'mt-5 group flex items-center text-sm  gap-3.5 font-medium p-2 text-primary-pruple-900 hover:bg-primary-green-500 rounded-md hover:text-white'
                    }
                    onClick={logout}
                >
                    <div>{React.createElement(IoLogOutOutline, { size: '20' })}</div>
                    <h2
                        style={{
                            transitionDelay: `${links.length + 3}00ms`
                        }}
                        className={!open ? 'whitespace-pre duration-500' : 'whitespace-pre duration-500 opacity-0 translate-x-28 overflow-hidden'}
                    >
            Cerrar Sesión
                    </h2>
                    <h2
                        className={open ? 'hidden absolute left-48 bg-white font-semibold whitespace-pre text-primary-pruple-900 hover:bg-primary-green-500 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit' : 'absolute left-48 bg-white font-semibold whitespace-pre text-primary-pruple-900 hover:bg-primary-green-500 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit'}
                    >
            Cerrar Sesión
                    </h2>
                </button>
            </div>
        </aside>
    );
};

export { LeftBar };
