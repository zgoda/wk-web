import { request } from './http';

const ENDPOINTS = new Map([
  ['event.collection', '/api/events'],
  ['event.item', '/api/event'],
]);

/**
 * @param {string} key
 * @param {any} value
 * @returns {any}
 */
function eventReviver(key, value) {
  if (['date', 'created'].includes(key)) {
    return new Date(parseInt(value.toString(), 10));
  }
  return value;
}

/**
 * @param {import('../..').EventData} event
 * @returns {import('../..').Event}
 */
function serializeEventData(event) {
  return {
    name: event.name,
    date: event.date.getTime(),
    length: event.length,
    location: event.location,
    virtual: event.virtual,
    public: event.public,
    description: event.description,
  };
}

/**
 * @returns {Promise<ReadonlyArray<import('../..').EventData>>}
 */
export async function fetchEvents() {
  const url = ENDPOINTS.get('event.collection');
  const result = await request.get(url);
  const text = await result.resp.text();
  const data = JSON.parse(text, eventReviver);
  return data.collection;
}

/**
 * @param {import('../..').EventData} event
 * @param {string} csrfAccessToken
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').RequestResult>}
 */
export async function createEvent(event, csrfAccessToken, csrfRefreshToken) {
  const url = ENDPOINTS.get('event.collection');
  const payload = serializeEventData(event);
  const result = await request.post(url, payload, csrfAccessToken, csrfRefreshToken);
  return result;
}

/**
 * @param {import('../..').EventData} event
 * @param {string} csrfAccessToken
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').RequestResult>}
 */
export async function updateEvent(event, csrfAccessToken, csrfRefreshToken) {
  const url = `${ENDPOINTS.get('event.item')}/${event.eventId}`;
  const payload = serializeEventData(event);
  const result = await request.patch(url, payload, csrfAccessToken, csrfRefreshToken);
  return result;
}

/**
 * @param {number} eventId
 * @returns {Promise<import('../..').EventData>}
 */
export async function fetchEvent(eventId) {
  const url = `${ENDPOINTS.get('event.item')}/${eventId}`;
  const result = await request.get(url);
  const text = await result.resp.text();
  const data = JSON.parse(text, eventReviver);
  return data.item;
}
