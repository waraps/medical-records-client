import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ILeftBar, LeftBar, Navbar } from '../components';
import ErrorBoundary from '../ErrorBoundary';
import { IAppState } from '../interfaces';
import { UsersActions } from '../redux/users';
import { IUsersReducer } from '../redux/users/IUsersReducer';

const Layout = ({ links }: ILeftBar): JSX.Element => {
    const dispatch = useDispatch();

    const { user } = useSelector<IAppState, IUsersReducer>(
        (state: IAppState) => state.user
    );

    useEffect(() => {
        if (!user) {
            dispatch(UsersActions.userRetrieve());
        }
    }, []);

    return (
        <main>
            <Navbar />
            <section className="flex">
                <LeftBar links={links} />
                <div className="p-4 w-screen">
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </div>
            </section>
        </main>
    );
};

export { Layout };
