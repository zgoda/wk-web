import { createStoreon } from 'storeon';

export function tokens(store) {
  store.on('@init', () => ({ token: '' }));
  // eslint-disable-next-line no-unused-vars
  store.on('token/set', ({ _ }, newToken) => {
    return { token: newToken };
  });
}

export const store = createStoreon([tokens]);
