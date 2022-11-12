import {
    AnyAction,
    applyMiddleware,
    legacy_createStore as createStore,
    Store,
    StoreEnhancer
} from 'redux';
import thunk from 'redux-thunk';
import { IAppState } from '../interfaces';
import { reducers } from './reducers';

const middlewares: StoreEnhancer = applyMiddleware(thunk);

export const store: Store<IAppState, AnyAction> = createStore(
    reducers,
    middlewares
);
