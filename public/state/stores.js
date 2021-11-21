import { map, mapTemplate } from 'nanostores';
import { fetchEvent } from '../utils/api';

export const tokenStore = map({
  csrfRefreshToken: '',
  csrfAccessToken: '',
});

export const sessionStore = map({
  /** @type {import('../..').User} */
  currentUser: null,
});

export const EventStore = mapTemplate(
  (
    /** @type {import('nanostores').MapStore<import('../..').EventData>} */ store,
    id,
  ) => {
    fetchEvent(id).then((evt) => store.set({ ...evt, id }));
  },
);
