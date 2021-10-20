import { request } from './http';
import { store } from '../state';

/**
 * @param {import('../..').User} user
 * @param {string} csrfAccessToken
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').UserUpdateResult>}
 */
async function updateUser(user, csrfAccessToken, csrfRefreshToken) {
  const url = `/api/user/${user.email}`;
  const payload = { name: user.name };
  const updateResult = await request.patch(
    url,
    payload,
    csrfAccessToken,
    csrfRefreshToken,
  );
  const data = await updateResult.resp.json();
  /** @type {import('../..').UserUpdateResult} */
  const rv = { status: updateResult.resp.ok, csrfAccessToken, csrfRefreshToken };
  if (updateResult.resp.ok) {
    rv.user = data.user;
  }
  if (updateResult.csrfAccessToken != null) {
    rv.csrfAccessToken = updateResult.csrfAccessToken;
    store.dispatch('csrfaccesstoken/set', updateResult.csrfAccessToken);
  }
  if (updateResult.csrfRefreshToken != null) {
    rv.csrfRefreshToken = updateResult.csrfRefreshToken;
    store.dispatch('csrfrefreshtoken/set', updateResult.csrfRefreshToken);
  }
  return rv;
}

export { updateUser };
