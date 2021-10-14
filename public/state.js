import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

/**
 * @param {import('storeon').StoreonStore} store
 */
export function tokens(store) {
  store.on('@init', () => ({
    csrfRefreshToken: '',
    csrfAccessToken: '',
  }));
  store.on('csrfrefreshtoken/set', (_state, /** @type {string} */ newToken) => ({
    csrfRefreshToken: newToken,
  }));
  store.on('csrfaccesstoken/set', (_state, /** @type {string} */ newToken) => ({
    csrfAccessToken: newToken,
  }));
}

/**
 * @param {import('storeon').StoreonStore} store
 */
export function session(store) {
  store.on('@init', () => ({
    currentUser: null,
    flashMessages: [],
  }));
  store.on('user/set', (_state, /** @type {import('..').User} */ user) => ({
    currentUser: user,
  }));
  store.on('user/clear', (_state) => ({
    currentUser: null,
  }));
  store.on(
    'flash/add',
    ({ flashMessages }, /** @type {import('..').FlashMessage} */ flash) => ({
      flashMessages: [flash, ...flashMessages],
    }),
  );
  store.on('flash/clear', (_state) => ({
    flashMessages: [],
  }));
}

export const store = createStoreon([
  tokens,
  session,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
]);
