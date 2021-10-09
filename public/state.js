import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

/**
 * @param {import('storeon').StoreonStore} store
 */
export function tokens(store) {
  store.on('@init', () => ({
    csrfRefreshToken: '',
    csrfAccessToken: '',
    currentUser: null,
  }));
  store.on('csrfrefreshtoken/set', (_state, /** @type {string} */ newToken) => ({
    csrfRefreshToken: newToken,
  }));
  store.on('csrfaccesstoken/set', (_state, /** @type {string} */ newToken) => ({
    csrfAccessToken: newToken,
  }));
  store.on('user/set', (_state, /** @type {import('..').User} */ user) => ({
    currentUser: user,
  }));
}

export const store = createStoreon([
  tokens,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
]);
