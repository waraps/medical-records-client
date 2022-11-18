import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthActions, IAuthReducer } from '../../redux/auth';
import { IAppState } from '../../interfaces';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, loginSchemaType } from './login-schema';
import { Button, Footer } from '../../components';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

import logo from '../../assets/images/galenos.webp';

const Login = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [inputType, setInputType] = useState<'text' | 'password'>('password');

    const { loading, error } = useSelector<IAppState, IAuthReducer>(
        (state: IAppState) => state.auth
    );

    const { register, handleSubmit, formState: { errors } } = useForm<loginSchemaType>({
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

    const showingPassword = (): void => {
        setShowPassword(!showPassword);
        if(inputType === 'password') {
            setInputType('text');
        } else {
            setInputType('password');
        }
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
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none"
                                id="email"
                                placeholder="Correo Electrónico"
                                {...register('email', { required: true })}
                            />
                            {(errors.email != null) && <span className="text-red-700">{errors.email.message}</span>}
                        </div>

                        <div className="mb-6">
                            <div className='flex justify-between items-center form-control w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none'>
                                <input
                                    type={inputType}
                                    className="w-full focus:outline-none"
                                    id="password"
                                    placeholder="Contraseña"
                                    {...register('password', { required: true })}
                                />
                                <button type='button' onClick={showingPassword}>
                                    {showPassword ? <IoEyeOffOutline size={30} color='#514D67' /> :  <IoEyeOutline size={30} color='#514D67' />}
                                </button>
                            </div>
                            {(errors.password != null) && <span className="text-red-700">{errors.password.message}</span>}
                        </div>

                        <div className="flex justify-end items-center mb-6">
                            <a href="#!" className="text-primary-pruple-700 hover:underline">
                                Recuperar contraseña
                            </a>
                        </div>

                        <Button loading={loading} label={'Ingresar'} loadingLabel={'Cargando...'} />
                    </form>
                </div>
                {error && (
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
