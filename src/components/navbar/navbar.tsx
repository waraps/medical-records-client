import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../interfaces';
import { IUsersReducer } from '../../redux/users/IUsersReducer';

import avatar from '../../assets/images/avatar-preview.webp';

const Navbar = (): JSX.Element => {
    const { user } = useSelector<IAppState, IUsersReducer>(
        (state: IAppState) => state.user
    );

    return (
        <nav className="bg-primary-pruple-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-14 items-center justify-between">
                    <div className="flex flex-1">
                        <div className="flex">
                            <h3 className="block h-8 w-auto lg:hidden font-medium leading-tight text-2xl text-white">
                                Bienvenido { user?.first_name ?? ''} { user?.last_name ?? ''} 👋
                            </h3>
                            <h3 className="hidden h-8 w-auto lg:block font-medium leading-tight text-2xl text-white">
                                Bienvenido { user?.first_name ?? ''} { user?.last_name.charAt(0) ?? ''}. 👋
                            </h3>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-10 w-10 rounded-full border-solid ring-1 ring-[#f5f5f5]"
                                        src={user?.avatar ?? avatar}
                                        alt="avatar"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export { Navbar };
