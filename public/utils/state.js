import { createContext } from 'preact';
import { customContext } from 'storeon/preact';

import { store } from '../state';

export const CustomContext = createContext(store);

export const useStoreon = customContext(CustomContext);
