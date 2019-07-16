const crypto = require('crypto');
const request = require('request-promise-native');

const hmac = (key, data) =>
  crypto
    .createHmac('sha256', key)
    .update(data)
    .digest('hex');

const API_URL = 'https://api.totalhash.com';

const performSearchRequest = (id, apiKey, opts, message, offset) => {
  const sign = hmac(apiKey, message);
  const url = `${API_URL}/search/${message}&id=${id}&sign=${sign}${
    offset ? `&start=${offset}` : ''
  }`;

  return request(url, opts);
};

const performAnalysisRequest = (id, apiKey, opts, ioc) => {
  const sign = hmac(apiKey, ioc);
  const url = `${API_URL}/analysis/${ioc}&id=${id}&sign=${sign}`;

  return request(url, opts);
};

const performUsageRequest = (id, apiKey, opts) => {
  const sign = hmac(apiKey, 'usage');
  const url = `${API_URL}/usage/id=${id}&sign=${sign}`;

  return request(url, opts);
};

module.exports = {
  performSearchRequest,
  performAnalysisRequest,
  performUsageRequest,
};
