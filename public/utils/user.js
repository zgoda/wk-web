import { buildPostRequest } from './http';

/**
 * @param {import('../..').User} user
 * @param {string} csrfToken
 * @returns {Promise<import('../..').UserUpdateResult>}
 */
async function updateUser(user, csrfToken) {
  const url = `/api/user/${user.email}`;
  const init = buildPostRequest(JSON.stringify({ name: user.name }), csrfToken);
  const resp = await fetch(url, init);
  const data = await resp.json();
  return { status: resp.ok, user: data.user };
}

export { updateUser };
