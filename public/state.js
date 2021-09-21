import { createStoreon } from 'storeon';

/**
 * @param {import('storeon').StoreonStore} store
 */
export function tokens(store) {
  store.on('@init', () => ({
    csrfToken: '',
  }));
  store.on('csrftoken/set', ({ _ }, newToken) => {
    return { csrfToken: newToken };
  });
}

export const store = createStoreon([tokens]);
