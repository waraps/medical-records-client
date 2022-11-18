import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
        console.error('getDerivedStateFromError:', error);
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className='flex flex-col items-center p-5'>
                    <h1 className='text-primary-pruple-600 text-6xl mb-5'>Vaya, eso fue inesperado.</h1>
                    <h1 className='text-primary-pruple-600 text-2xl mb-5'>Ocurrio un error al tratar de cargar la informacion.</h1>
                    <button className='p-4 bg-primary-pruple-500 text-white text-lg rounded-xl' onClick={() => location.reload()}>Intenta Nuevamente</button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;