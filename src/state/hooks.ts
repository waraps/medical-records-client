import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store from './store';
import { IAppState } from '../interfaces/state';

export const useAppSelector: TypedUseSelectorHook<IAppState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
