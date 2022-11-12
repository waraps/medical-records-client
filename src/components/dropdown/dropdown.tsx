import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { IMenu } from '../../interfaces';

interface IDropdown {
  link: IMenu
  numberOfLink: number
  openBar: boolean
}
export const Dropdown = ({
    link,
    numberOfLink,
    openBar
}: IDropdown): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                data-dropdown-toggle="dropdown"
                className={
                    'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-300 rounded-md'
                }
                type="button"
            >
                <div>{React.createElement(IoLogOutOutline, { size: '20' })}</div>
                <h2
                    style={{
                        transitionDelay: `${numberOfLink + 3}00ms`
                    }}
                    className={!openBar ? 'whitespace-pre duration-500' : 'whitespace-pre duration-500 opacity-0 translate-x-28 overflow-hidden'}
                >
                    {link?.name}
                </h2>
                <h2
                    className={openBar ? 'hidden absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit' : 'absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit'}
                >
                    {link?.name}
                </h2>
                <svg
                    className="ml-2 w-4 h-4"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>

            <div
                id="dropdown"
                className={`${open ? '' : 'hidden gap-2 mt-4'} flex flex-col relative`}
            >
                {link.children?.map((menu, i) =>
                    (menu.children != null)
                        ? (
                            <Dropdown
                                key={menu?.link}
                                link={menu}
                                numberOfLink={i}
                                openBar={open}
                            />
                        )
                        : (
                            <Link
                                to={menu?.link}
                                key={`i-${menu.name}`}
                                className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-300 rounded-md"
                            >
                                {!openBar && (
                                    <div>{React.createElement(menu?.icon, { size: '20' })}</div>
                                )}
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`
                                    }}
                                    className={!openBar ? 'whitespace-pre duration-500 opacity-0 translate-x-28 overflow-hidden' : 'whitespace-pre duration-500 ml-8'}
                                >
                                    {menu?.name}
                                </h2>
                                {!openBar && (
                                    <h2
                                        className={openBar ? 'hidden absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit' : 'absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit'}
                                    >
                                        {menu?.name}
                                    </h2>
                                )}
                            </Link>
                        )
                )}
            </div>
        </>
    );
};
