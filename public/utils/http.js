/**
 *
 * @param {string} body
 * @param {string} [csrfToken]
 * @returns {RequestInit}
 */
function buildPostRequest(body, csrfToken) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (csrfToken != null) {
    headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return {
    method: 'POST',
    credentials: 'same-origin',
    headers,
    body,
  };
}

export { buildPostRequest };
