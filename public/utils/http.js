import Cookie from 'cookie-universal';
import { useEffect, useReducer, useRef } from 'preact/hooks';

/**
 * @param {string} key
 * @param {any} value
 * @returns {any}
 */
export function dateReviver(key, value) {
  if (['date', 'created'].includes(key)) {
    return new Date(parseInt(value.toString(), 10));
  }
  return value;
}

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
 * @param {Response} resp
 * @returns {Promise<import('../..').AuthResult>}
 */
async function parseAuthResponse(resp) {
  /** @type {import('../..').AuthResult} */
  const result = { status: resp.status, ok: resp.ok };
  const data = await resp.json();
  if (resp.ok) {
    const cookies = Cookie();
    result.csrfRefreshToken = cookies.get('csrf_refresh_token');
    result.csrfAccessToken = cookies.get('csrf_access_token');
    if (data.user != null) {
      result.user = { ...data.user };
    } else {
      result.user = null;
    }
  } else {
    result.error = data.message;
  }
  return result;
}

/**
 * @param {string} url
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').AuthResult>}
 */
async function _refreshPost(url, csrfRefreshToken, body = null) {
  const requestBody = body || '';
  const resp = await fetch(url, buildPostRequest(requestBody, csrfRefreshToken));
  const result = await parseAuthResponse(resp);
  return result;
}

/**
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').AuthResult>}
 */
async function reauthenticateReq(csrfRefreshToken) {
  const url = '/auth/refresh';
  const result = await _refreshPost(url, csrfRefreshToken);
  return result;
}

/**
 * @param {string} csrfRefreshToken
 * @returns {Promise<import('../..').AuthResult>}
 */
async function logoutReq(csrfRefreshToken) {
  const url = '/auth/logout';
  const result = await _refreshPost(url, csrfRefreshToken);
  return result;
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
    reauthResult = await reauthenticateReq(csrfRefreshToken);
    didReauth = true;
    options.headers['X-CSRF-TOKEN'] = reauthResult.csrfAccessToken;
    resp = await fetch(url, options);
  }
  /** @type {import('../..').RequestResult} */
  const rv = { resp, csrfAccessToken, csrfRefreshToken };
  if (resp.ok && resp.status < 400 && didReauth) {
    rv.csrfAccessToken = reauthResult.csrfAccessToken;
    rv.csrfRefreshToken = reauthResult.csrfRefreshToken;
  }
  return rv;
}

const request = {
  /**
   * @param {RequestInfo} url
   * @param {any} [payload]
   * @param {string} [csrfAccessToken]
   * @param {string} [csrfRefreshToken]
   * @returns {Promise<import('../..').RequestResult>}
   */
  async get(url, payload, csrfAccessToken, csrfRefreshToken) {
    return await _request('GET', url, payload, csrfAccessToken, csrfRefreshToken);
  },
  /**
   * @param {RequestInfo} url
   * @param {any} [payload]
   * @param {string} [csrfAccessToken]
   * @param {string} [csrfRefreshToken]
   * @returns {Promise<import('../..').RequestResult>}
   */
  async post(url, payload, csrfAccessToken, csrfRefreshToken) {
    return await _request('POST', url, payload, csrfAccessToken, csrfRefreshToken);
  },
  /**
   * @param {RequestInfo} url
   * @param {any} [payload]
   * @param {string} [csrfAccessToken]
   * @param {string} [csrfRefreshToken]
   * @returns {Promise<import('../..').RequestResult>}
   */
  async put(url, payload, csrfAccessToken, csrfRefreshToken) {
    return await _request('PUT', url, payload, csrfAccessToken, csrfRefreshToken);
  },
  /**
   * @param {RequestInfo} url
   * @param {any} [payload]
   * @param {string} [csrfAccessToken]
   * @param {string} [csrfRefreshToken]
   * @returns {Promise<import('../..').RequestResult>}
   */
  async patch(url, payload, csrfAccessToken, csrfRefreshToken) {
    return await _request('PATCH', url, payload, csrfAccessToken, csrfRefreshToken);
  },
  /**
   * @param {RequestInfo} url
   * @param {any} [payload]
   * @param {string} [csrfAccessToken]
   * @param {string} [csrfRefreshToken]
   * @returns {Promise<import('../..').RequestResult>}
   */
  async delete(url, payload, csrfAccessToken, csrfRefreshToken) {
    return await _request('DELETE', url, payload, csrfAccessToken, csrfRefreshToken);
  },
};

export const useFetchItem = (/** @type {string} */ url) => {
  const cache = useRef({});

  const initialState = {
    status: 'idle',
    error: null,
    data: null,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' };
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) {
      return;
    }
    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      let itemData;
      if (cache.current[url]) {
        itemData = cache.current[url];
        dispatch({ type: 'FETCHED', payload: itemData.item });
      } else {
        try {
          const result = await request.get(url);
          const text = await result.resp.text();
          itemData = JSON.parse(text, dateReviver);
          cache.current[url] = itemData;
          if (cancelRequest) {
            return;
          }
          dispatch({ type: 'FETCHED', payload: itemData.item });
        } catch (error) {
          if (cancelRequest) {
            return;
          }
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };
    fetchData();
    return () => (cancelRequest = true);
  }, [url]);
  return state;
};

export { buildPostRequest, parseAuthResponse, request, logoutReq };
