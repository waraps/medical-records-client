import React from 'react';

const Footer = (): JSX.Element => {
    return (
        <footer className="w-full bg-primary-pruple-500 shadow p-1 text-center text-gray-50">
            <p>Galenos Clínica Veterinaria &copy; {new Date().getFullYear()}</p>
        </footer>
    );
};

export { Footer };
