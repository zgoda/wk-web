import { map, mapTemplate, task } from 'nanostores';
import { fetchEvent } from '../utils/api';

export const tokenStore = map({
  csrfRefreshToken: '',
  csrfAccessToken: '',
});

export const sessionStore = map({
  /** @type {import('../..').User} */
  currentUser: null,
});

export const appStateStore = map({
  isLoading: false,
});

export const EventStore = mapTemplate(
  (
    /** @type {import('nanostores').MapStore<import('../..').EventData>} */ store,
    id,
  ) => {
    task(async () => {
      appStateStore.set({ isLoading: true });
      const event = await fetchEvent(id);
      store.set({ ...event, id });
      appStateStore.set({ isLoading: false });
    });
  },
);
