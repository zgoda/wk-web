import Cookie from 'cookie-universal';

/**
 * @param {Response} resp
 * @returns {Promise<Map<string, string|number>>}
 */
async function parseResponse(resp) {
  const result = new Map();
  result.set('status', resp.status);
  const data = await resp.json();
  if (resp.ok) {
    const cookies = Cookie();
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
 * @returns {Promise<Map<string, string|number>>}
 */
async function login(email, password) {
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
 * @param {String} email
 * @param {String} password
 * @returns {Promise<Map<string, string|number>>}
 */
async function register(email, password) {
  const url = '/auth/register';
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
 * @returns {Promise<Map<string, string|number>>}
 */
async function reauthenticate() {
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

/**
 *
 * @param {string} csrfToken
 * @param {string} accessToken
 * @returns {boolean}
 */
function isAuthenticated(csrfToken, accessToken) {
  if ([csrfToken, accessToken].includes('')) {
    return false;
  }
  return csrfToken != null && accessToken != null;
}

export { login, register, reauthenticate, isAuthenticated };
