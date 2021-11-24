import { map } from 'nanostores';

export const tokenStore = map({
  csrfRefreshToken: '',
  csrfAccessToken: '',
});

export const sessionStore = map({
  /** @type {import('../..').User} */
  currentUser: null,
});
