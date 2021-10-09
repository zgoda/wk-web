import Cookie from 'cookie-universal';

import { buildPostRequest } from './http';

/**
 * @param {Response} resp
 * @returns {Promise<import('../..').AuthResult>}
 */
async function parseResponse(resp) {
  /** @type {import('../..').AuthResult} */
  const result = { status: resp.status, ok: resp.ok };
  const data = await resp.json();
  if (resp.ok) {
    const cookies = Cookie();
    result.csrfRefreshToken = cookies.get('csrf_refresh_token');
    result.csrfAccessToken = cookies.get('csrf_access_token');
    result.user = { ...data.user };
  } else {
    result.error = data.message;
  }
  return result;
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('../..').AuthResult>}
 */
async function login(email, password) {
  const url = '/auth/login';
  const resp = await fetch(url, buildPostRequest(JSON.stringify({ email, password })));
  const result = await parseResponse(resp);
  return result;
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('../..').AuthResult>}
 */
async function register(email, password) {
  const url = '/auth/register';
  const resp = await fetch(url, buildPostRequest(JSON.stringify({ email, password })));
  const result = await parseResponse(resp);
  return result;
}

/**
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').AuthResult>}
 */
async function reauthenticate(csrfRefreshToken) {
  const url = '/auth/refresh';
  const resp = await fetch(url, buildPostRequest('', csrfRefreshToken));
  const result = await parseResponse(resp);
  return result;
}

export { login, register, reauthenticate };
