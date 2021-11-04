import { action, map } from 'nanostores';

export const tokenStore = map({
  csrfRefreshToken: '',
  csrfAccessToken: '',
});

export const setAccessToken = action(
  tokenStore,
  'setAccessToken',
  (store, /** @type {string} */ token) => {
    store.setKey('csrfAccessToken', token);
  },
);

export const setRefreshToken = action(
  tokenStore,
  'setRefreshToken',
  (store, /** @type {string} */ token) => {
    store.setKey('csrfRefreshToken', token);
  },
);

export const sessionStore = map({
  /** @type {import('..').User} */
  currentUser: null,
});

export const setCurrentUser = action(
  sessionStore,
  'setCurrentUser',
  (store, /** @type {import('..').User} */ user) => {
    store.setKey('currentUser', user);
  },
);

export const clearUser = action(sessionStore, 'clearUser', (store, _ignored) => {
  store.setKey('currentUser', null);
});
