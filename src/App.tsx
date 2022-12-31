import React from 'react';
import { Router } from './router';
import { Provider } from 'react-redux';
import store from './state/store';

const App = (): JSX.Element => (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default App;
