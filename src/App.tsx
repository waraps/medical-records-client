import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Router } from './routes';

function App (): JSX.Element {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

export default App;
