import { action } from 'nanostores';
import { appStateStore, sessionStore, tokenStore } from './stores';

export const setAccessToken = action(
  tokenStore,
  'setAccessToken',
  (store, /** @type {string} */ token) => {
    store.setKey('csrfAccessToken', token);
    return store.get();
  },
);

export const setRefreshToken = action(
  tokenStore,
  'setRefreshToken',
  (store, /** @type {string} */ token) => {
    store.setKey('csrfRefreshToken', token);
    return store.get();
  },
);

export const setCurrentUser = action(
  sessionStore,
  'setCurrentUser',
  (store, /** @type {import('../..').User} */ user) => {
    store.setKey('currentUser', user);
    return store.get();
  },
);

export const clearUser = action(sessionStore, 'clearUser', (store) => {
  store.setKey('currentUser', null);
  return store.get();
});

export const setAppStateLoading = action(
  appStateStore,
  'setAppStateLoading',
  (store, /** @type {boolean} */ value) => {
    store.setKey('isLoading', value);
    return store.get();
  },
);
