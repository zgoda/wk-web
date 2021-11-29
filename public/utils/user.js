import { setAccessToken, setRefreshToken } from '../state/actions';
import { request } from './http';

/**
 * @param {import('../..').User} user
 * @param {string} csrfAccessToken
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').UserUpdateResult>}
 */
export async function updateUser(user, csrfAccessToken, csrfRefreshToken) {
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
    setAccessToken(updateResult.csrfAccessToken);
  }
  if (updateResult.csrfRefreshToken != null) {
    rv.csrfRefreshToken = updateResult.csrfRefreshToken;
    setRefreshToken(updateResult.csrfRefreshToken);
  }
  return rv;
}

/**
 * @param {import('../..').EventData} event
 * @param {import('../..').User} user
 * @returns {boolean}
 */
export function isActiveOwner(event, user) {
  if (user.isActive && event.user != null && user.email === event.user.email) {
    return true;
  }
  return false;
}
