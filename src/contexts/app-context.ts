import { createContext } from 'react';
import { IAppContext } from './types';

export const appContext = createContext<IAppContext | undefined>(undefined);