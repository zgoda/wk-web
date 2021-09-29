import Cookies from 'universal-cookie';

/**
 * @param {Response} resp
 * @return {Promise<Map<string, string|number>>}
 */
async function parseResponse(resp) {
  const cookies = new Cookies();
  const result = new Map();
  result.set('status', resp.status);
  const data = await resp.json();
  if (resp.ok) {
    result.set('csrf_refresh_token', cookies.get('csrf_refresh_token'));
    result.set('access_token', data.access_token);
  } else {
    result.set('error', data.message);
  }
  return result;
}

/**
 * @param {String} email
 * @param {String} password
 * @return {Promise<Map<string, string|number>>}
 */
export async function login(email, password) {
  const url = '/auth/login';
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const result = await parseResponse(resp);
  return result;
}

/**
 * @return {Promise<Map<string, string|number>>}
 */
export async function reauthenticate() {
  const url = '/auth/refresh';
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await parseResponse(resp);
  return result;
}
