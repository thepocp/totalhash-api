const crypto = require('crypto');
const request = require('request-promise-native');
const parseXml = require('xml2js').parseString;

const hmac = (key, data) =>
  crypto
    .createHmac('sha256', key)
    .update(data)
    .digest('hex');

const API_URL = 'https://api.totalhash.com';

const performRequest = async (url, opts, convert) => {
  const data = await request(url, opts);

  return new Promise((resolve, reject) => {
    if (convert) {
      parseXml(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      resolve(data);
    }
  });
};

const performSearchRequest = (id, apiKey, opts, message, offset) => {
  const sign = hmac(apiKey, message);
  const url = `${API_URL}/search/${message}&id=${id}&sign=${sign}${
    offset ? `&start=${offset}` : ''
  }`;

  return performRequest(url, opts, true);
};

const performAnalysisRequest = (id, apiKey, opts, ioc) => {
  const sign = hmac(apiKey, ioc);
  const url = `${API_URL}/analysis/${ioc}&id=${id}&sign=${sign}`;

  return performRequest(url, opts, true);
};

const performUsageRequest = (id, apiKey, opts) => {
  const sign = hmac(apiKey, 'usage');
  const url = `${API_URL}/usage/id=${id}&sign=${sign}`;

  return performRequest(url, opts);
};

module.exports = {
  performSearchRequest,
  performAnalysisRequest,
  performUsageRequest,
};
