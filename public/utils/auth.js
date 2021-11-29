import { logoutReq, parseAuthResponse, request } from './http';

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('../..').AuthResult>}
 */
export async function login(email, password) {
  const url = '/auth/login';
  const rv = await request.post(url, { email, password });
  const result = await parseAuthResponse(rv.resp);
  return result;
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('../..').AuthResult>}
 */
export async function register(email, password) {
  const url = '/auth/register';
  const rv = await request.post(url, { email, password });
  const result = await parseAuthResponse(rv.resp);
  return result;
}

/**
 * @param {string} csrfToken
 * @returns {Promise<import('../..').AuthResult>}
 */
export async function logout(csrfToken) {
  const rv = await logoutReq(csrfToken);
  return rv;
}
