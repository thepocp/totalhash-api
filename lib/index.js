const crypto = require('crypto');
const request = require('request-promise-native');
const parser = require('xml2json');

const hmac = (key, data) =>
  crypto
    .createHmac('sha256', key)
    .update(data)
    .digest('hex');

const performRequest = async (url, opts, convert) => {
  const result = await request(url, opts);
  return convert ? parser.toJson(result) : result;
};

const totalhash = (id, apiKey) => ({
  search: ({ message, offset, opts }) => {
    const sign = hmac(apiKey, message);
    const url = `https://api.totalhash.com/search/${message}&id=${id}&sign=${sign}${
      offset ? `&start=${offset}` : ''
    }`;

    return performRequest(url, opts, true);
  },

  analysis: ({ ioc, opts }) => {
    const sign = hmac(apiKey, ioc);
    const url = `https://api.totalhash.com/analysis/${ioc}&id=${id}&sign=${sign}`;

    return performRequest(url, opts, true);
  },

  usage: ({ opts }) => {
    const sign = hmac(apiKey, 'usage');
    const url = `https://api.totalhash.com/usage/id=${id}&sign=${sign}`;

    return performRequest(url, opts);
  },
});

module.exports = totalhash;
