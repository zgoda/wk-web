/**
 *
 * @param {string} body
 * @param {string} [refreshToken]
 * @returns {RequestInit}
 */
function buildPostRequest(body, refreshToken) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (refreshToken != null) {
    headers['X-CSRF-TOKEN'] = refreshToken;
  }
  return {
    method: 'POST',
    credentials: 'same-origin',
    headers,
    body,
  };
}

export { buildPostRequest };
