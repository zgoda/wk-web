import { reauthenticate } from './auth';

/**
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

/**
 * @param {string} method
 * @param {RequestInfo} url
 * @param {any} [payload]
 * @param {string} [csrfAccessToken]
 * @param {string} [csrfRefreshToken]
 * @returns {Promise<import('../..').RequestResult>}
 */
async function _request(method, url, payload, csrfAccessToken, csrfRefreshToken) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (csrfAccessToken != null) {
    headers['X-CSRF-TOKEN'] = csrfAccessToken;
  }
  /** @type {RequestCredentials} */
  const credentials = 'same-origin';
  const options = {
    method,
    credentials,
    headers,
  };
  if (['POST', 'PUT', 'PATCH'].includes(method) && payload != null) {
    options.body = JSON.stringify(payload);
  }
  let didReauth = false;
  let resp = await fetch(url, options);
  /** @type {import('../..').AuthResult} */
  let reauthResult;
  if (resp.status === 401 && csrfRefreshToken != null) {
    reauthResult = await reauthenticate(csrfRefreshToken);
    didReauth = true;
    options.headers['X-CSRF-TOKEN'] = reauthResult.csrfAccessToken;
    resp = await fetch(url, options);
  }
  const rv = { resp };
  if (resp.ok && resp.status < 400 && didReauth) {
    rv.csrfAccessToken = reauthResult.csrfAccessToken;
    rv.csrfRefreshToken = reauthResult.csrfRefreshToken;
  }
  return rv;
}

const request = {
  get: async function (
    /** @type {RequestInfo} */ url,
    /** @type {any} */ [payload],
    /** @type {string} */ [csrfAccessToken],
    /** @type {string} */ [csrfRefreshToken],
  ) {
    return await _request('GET', url, payload, csrfAccessToken, csrfRefreshToken);
  },
  post: async function (
    /** @type {RequestInfo} */ url,
    /** @type {any} */ [payload],
    /** @type {string} */ [csrfAccessToken],
    /** @type {string} */ [csrfRefreshToken],
  ) {
    return await _request('POST', url, payload, csrfAccessToken, csrfRefreshToken);
  },
  put: async function (
    /** @type {RequestInfo} */ url,
    /** @type {any} */ [payload],
    /** @type {string} */ [csrfAccessToken],
    /** @type {string} */ [csrfRefreshToken],
  ) {
    return await _request('PUT', url, payload, csrfAccessToken, csrfRefreshToken);
  },
  patch: async function (
    /** @type {RequestInfo} */ url,
    /** @type {any} */ [payload],
    /** @type {string} */ [csrfAccessToken],
    /** @type {string} */ [csrfRefreshToken],
  ) {
    return await _request('PATCH', url, payload, csrfAccessToken, csrfRefreshToken);
  },
  delete: async function (
    /** @type {RequestInfo} */ url,
    /** @type {any} */ [payload],
    /** @type {string} */ [csrfAccessToken],
    /** @type {string} */ [csrfRefreshToken],
  ) {
    return await _request('DELETE', url, payload, csrfAccessToken, csrfRefreshToken);
  },
};

export { buildPostRequest, request };
