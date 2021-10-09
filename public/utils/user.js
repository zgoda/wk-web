import { buildPostRequest } from './http';

/**
 * @param {import('../..').User} user
 * @param {string} csrfToken
 * @returns Promise<boolean>
 */
async function updateUser(user, csrfToken) {
  const url = `/api/user/${user.email}`;
  const init = buildPostRequest(JSON.stringify({ name: user.name }), csrfToken);
  const resp = await fetch(url, init);
  return resp.ok;
}

export { updateUser };
