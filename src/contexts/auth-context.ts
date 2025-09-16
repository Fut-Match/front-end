import { createContext } from 'react';
import { IAuthContext } from './types';

export const authContext = createContext<IAuthContext | undefined>(undefined);