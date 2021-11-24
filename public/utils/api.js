import { dateReviver, request } from './http';

const ENDPOINTS = new Map([
  ['event.collection', '/api/events'],
  ['event.item', '/api/event'],
]);

/**
 * @returns {Promise<ReadonlyArray<import('../..').EventData>>}
 */
async function fetchEvents() {
  const url = ENDPOINTS.get('event.collection');
  const result = await request.get(url);
  const text = await result.resp.text();
  const data = JSON.parse(text, dateReviver);
  return data.collection;
}

/**
 * @param {import('../..').Event} event
 * @param {string} csrfAccessToken
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').RequestResult>}
 */
async function createEvent(event, csrfAccessToken, csrfRefreshToken) {
  const url = ENDPOINTS.get('event.collection');
  const result = await request.post(url, event, csrfAccessToken, csrfRefreshToken);
  return result;
}

/**
 * @param {number} eventId
 * @returns {Promise<import('../..').EventData>}
 */
async function fetchEvent(eventId) {
  const url = `${ENDPOINTS.get('event.item')}/${eventId}`;
  const result = await request.get(url);
  const text = await result.resp.text();
  const data = JSON.parse(text, dateReviver);
  return data.item;
}

export { fetchEvent, fetchEvents, createEvent };
