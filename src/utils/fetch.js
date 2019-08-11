import _merge from 'lodash/merge';

const defaultFetchOptions = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

export default function(url, options = {}) {
  return fetch(url, _merge(defaultFetchOptions, options))
    .then(res => {
      const { ok, status, statusText } = res;
      return res.json().then(data => ({
        ok,
        status,
        statusText: data.message || statusText,
        data
      }));
    })
    .catch(error => ({
      ok: false,
      status: 400,
      statusText: error.message || 'NETWORK_ERROR',
      data: {}
    }));
}
