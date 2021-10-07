import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

/**
 * @param {import('storeon').StoreonStore} store
 */
export function tokens(store) {
  store.on('@init', () => ({
    csrfToken: '',
    accessToken: '',
  }));
  store.on('csrftoken/set', (_state, newToken) => ({ csrfToken: newToken }));
  store.on('accesstoken/set', (_state, newToken) => ({ accessToken: newToken }));
}

export const store = createStoreon([
  tokens,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
]);
