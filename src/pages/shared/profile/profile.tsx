import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../interfaces';
import { IUsersReducer } from '../../../redux/users/IUsersReducer';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { userType } from '../../../tools';

import avatar from '../../../assets/images/avatar-preview.webp';

const Profile = (): JSX.Element => {
    const { user } = useSelector<IAppState, IUsersReducer>(
        (state: IAppState) => state.user
    );

    if (!user) {
        return <div>loading ...</div>;
    }

    return (
        <main className="flex flex-col items-center justify-center mt-6">
            <div className="w-2/3 h-3/4 rounded overflow-hidden shadow-lg">
                <div className="h-72 bg-primary-green-300" />
                <div className="flex flex-col items-center justify-center">
                    <img
                        alt="profile"
                        src={user?.avatar ?? avatar}
                        className="bg-slate-50 shadow-xl ring-4 ring-primary-pruple-300 rounded-full h-48 border -mt-24 mb-5"
                    />
                    <div className="text-center">
                        <div className="font-bold text-3xl mt-4 mb-2">
                            {user?.first_name} {user?.last_name}
                        </div>
                        <p className="text-primary-pruple-700 text-xl">
                            <span className="font-semibold mr-2">Correo:</span>
                            {user?.email}
                        </p>
                        <p className="text-primary-pruple-700 text-xl">
                            <span className="font-semibold mr-2">C.I:</span>
                            {user?.dni}
                        </p>
                        <p className="text-primary-pruple-700 text-xl">
                            <span className="font-semibold mr-2">Usuario:</span>
                            {userType(user?.rol_id)}
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-6">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            Registrado el{' '}
                            {format(new Date(user?.createdAt ?? 0), 'dd \'de\' LLLL \'del\' yyyy', { locale: es })}
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export { Profile };
