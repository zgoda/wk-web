import { request } from './http';

const ENDPOINTS = new Map([['event.collection', '/api/events']]);

/**
 * @returns {Promise<ReadonlyArray<import('../..').Event>>}
 */
async function fetchEvents() {
  const url = ENDPOINTS.get('event.collection');
  const result = await request.get(url);
  const data = await result.resp.json();
  return data.events;
}

export { fetchEvents };
