import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components';
import notFound from '../assets/images/404.webp';

export const NotFound = () => {
    return (
        <div className='h-screen w-screen'>
            <div className='w-full bg-primary-pruple-500 absolute top-0 py-5 overflow-hidden shadow-lg border-b border-primary-pruple-500' />
            <div className='w-full h-full bg-[#EAEAF6] flex flex-col justify-center items-center'>
                <img src={notFound} alt="404" />
                <span className="text-primary-pruple-500 text-5xl sm:text-3xl block text-center sm:mb-0 mb-1">Lo sentimos</span>
                <span className="text-primary-pruple-500 text-3xl sm:text-xl block text-center">No pudimos encontrar lo que estas buscando!</span>
                <div className='sm:mt-4 sm:mb-20 mt-10'>
                    <Link to='/'>
                        <a className="text-white font-mono text-xl bg-primary-pruple-400 p-3 rounded-md hover:shadow-md">
                            Regresar
                        </a>
                    </Link>
                </div>
            </div>
            <div className='w-full absolute bottom-0'>
                <Footer />
            </div>
        </div>
    );
};