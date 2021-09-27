import { createStoreon } from 'storeon';

/**
 * @param {import('storeon').StoreonStore} store
 */
export function tokens(store) {
  store.on('@init', () => ({
    csrfToken: '',
    accessToken: '',
  }));
  store.on('csrftoken/set', ({ newToken }) => ({ csrfToken: newToken }));
  store.on('accesstoken/set', ({ newToken }) => ({ csrfToken: newToken }));
}

export const store = createStoreon([tokens]);
