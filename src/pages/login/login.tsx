import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthActions, IAuthReducer } from '../../redux/auth';
import { IAppState } from '../../interfaces';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, loginSchemaType } from './login-schema';
import { Footer } from '../../components';

import logo from '../../assets/images/galenos.webp';

const Login = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector<IAppState, IAuthReducer>(
        (state: IAppState) => state.auth
    );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<loginSchemaType>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        shouldFocusError: true,
        resolver: yupResolver(loginSchema),
        criteriaMode: 'firstError',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const navigateTo = (): void => navigate('/');
    const onSubmit = (schema: loginSchemaType): void => {
        const { email, password } = schema;
        dispatch(AuthActions.signin(email, password, navigateTo));
    };

    return (
        <div className="bg-gray-50 h-screen flex flex-col justify-between">
            <nav className="bg-primary-pruple-500 w-full py-6 overflow-hidden shadow-lg border-b border-primary-pruple-500" />
            <main className="flex justify-center">
                <div className="rounded-xl overflow-hidden shadow-lg border xl:ml-20 w-11/12 xl:w-6/12 lg:w-8/12 md:w-8/12 mb-12 md:mb-0 px-7 pt-8 pb-16">
                    <div className="flex justify-center mb-16">
                        <img
                            className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                            src={logo}
                            alt="Galenos Logo"
                        />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <input
                                type="text"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-pruple-100 focus:outline-none"
                                id="email"
                                placeholder="Correo Electrónico"
                                {...register('email', { required: true })}
                            />
                            {(errors.email != null) && <span className="text-red-700">{errors.email.message}</span>}
                        </div>

                        <div className="mb-6">
                            <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-pruple-100 focus:outline-none"
                                id="password"
                                placeholder="Contraseña"
                                {...register('password', { required: true })}
                            />
                            {(errors.password != null) && <span className="text-red-700">{errors.password.message}</span>}
                        </div>

                        <div className="flex justify-end items-center mb-6">
                            <a href="#!" className="text-primary-pruple-700 hover:underline">
                Recuperar contraseña
                            </a>
                        </div>

                        <div className="text-center">
                            <button
                                disabled={loading}
                                type="submit"
                                className={
                                    loading
                                        ? 'w-full inline-flex justify-center items-center px-7 py-3 bg-primary-pruple-400 text-white font-medium text-2xl leading-snug rounded-md shadow-md focus:outline-none disabled:opacity-25'
                                        : 'w-full inline-flex justify-center items-center px-7 py-3 bg-primary-pruple-400 text-white font-medium text-2xl leading-snug rounded-md shadow-md hover:bg-primary-pruple-500 hover:shadow-lg focus:bg-primary-pruple-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-pruple-500 active:shadow-lg transition duration-150 ease-in-out'
                                }
                            >
                                {!loading
                                    ? (
                                        'Ingresar'
                                    )
                                    : (
                                        <div className="p-1" role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="mr-3 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary-pruple-500"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                ></path>
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                ></path>
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    )}
                            </button>
                        </div>
                    </form>
                </div>
                {(error != null) && (
                    <div
                        id="toast-bottom-right"
                        className="flex absolute right-5 bottom-10 items-center p-4 space-x-4 w-full max-w-xs text-gray-500 bg-red-500 rounded-lg divide-x divide-gray-200 shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
                        role="alert"
                        data-dismiss-target="#toast-default"
                    >
                        <div className="text-sm font-normal text-white">
                            {error.message}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export { Login };
