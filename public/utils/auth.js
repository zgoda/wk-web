import Cookies from 'universal-cookie';

/**
 * @param {String} email
 * @param {String} password
 * @returns {Promise<Map<String, String|Number>>}
 */
export async function login(email, password) {
  const cookies = new Cookies();
  const url = '/auth/v1/login';
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
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
