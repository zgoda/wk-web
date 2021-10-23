import { request } from './http';

const ENDPOINTS = new Map([['event.collection', '/api/events']]);

/**
 * @returns {Promise<ReadonlyArray<import('../..').Event>>}
 */
async function fetchEvents() {
  const url = ENDPOINTS.get('event.collection');
  const result = await request.get(url);
  const text = await result.resp.text();
  const data = JSON.parse(text, (key, value) => {
    if (key === 'date') {
      return new Date(parseInt(value.toString(), 10));
    }
    return value;
  });
  return data.events;
}

/**
 * @param {import('../..').Event} event
 * @param {string} csrfAccessToken
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').RequestResult>}
 */
async function createEvent(event, csrfAccessToken, csrfRefreshToken) {
  // eslint-disable-next-line no-unused-vars
  const url = ENDPOINTS.get('event.collection');
  const result = await request.post(url, event, csrfAccessToken, csrfRefreshToken);
  return result;
}

export { fetchEvents, createEvent };
