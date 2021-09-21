import { createStoreon } from 'storeon';

/**
 * @param {import('storeon').StoreonStore} store
 */
export function tokens(store) {
  store.on('@init', () => ({
    csrfToken: '',
    accessToken: '',
  }));
  store.on('csrftoken/set', ({ _ }, newToken) => {
    return { csrfToken: newToken };
  });
  store.on('accesstoken/set', ({ _ }, newToken) => {
    return { accessToken: newToken };
  });
}

export const store = createStoreon([tokens]);
