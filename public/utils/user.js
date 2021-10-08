import Cookie from 'cookie-universal';

import { buildPostRequest } from './http';

/**
 * @param {import('../..').User} user
 * @param {string} accessToken
 * @param {string} csrfToken
 * @returns Promise<boolean>
 */
async function updateUser(user, accessToken, csrfToken) {
  const url = `/api/user/${user.email}`;
  const cookies = Cookie();
  cookies.set('access_token_cookie', accessToken);
  const init = buildPostRequest(JSON.stringify({ name: user.name }), csrfToken);
  const resp = await fetch(url, init);
  return resp.ok;
}

export { updateUser };
