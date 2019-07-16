const crypto = require('crypto');
const request = require('request-promise-native');
const parseXml = require('xml2js').parseString;

const hmac = (key, data) =>
  crypto
    .createHmac('sha256', key)
    .update(data)
    .digest('hex');

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

const totalhash = (id, apiKey) => ({
  search: async ({ message, offset, opts }) => {
    const sign = hmac(apiKey, message);
    const url = `https://api.totalhash.com/search/${message}&id=${id}&sign=${sign}${
      offset ? `&start=${offset}` : ''
    }`;

    const data = await performRequest(url, opts, true);
    const { doc, $ } = data.response.result[0];

    return JSON.stringify({
      doc: doc.map(({ str }) => ({ [str[0].$.name]: str[0]._ })),
      numFound: $.numFound,
      start: $.start,
    });
  },

  analysis: async ({ ioc, opts }) => {
    const sign = hmac(apiKey, ioc);
    const url = `https://api.totalhash.com/analysis/${ioc}&id=${id}&sign=${sign}`;

    const { analysis } = await performRequest(url, opts, true);
    return JSON.stringify(analysis);
  },

  usage: options => {
    const sign = hmac(apiKey, 'usage');
    const url = `https://api.totalhash.com/usage/id=${id}&sign=${sign}`;

    return performRequest(url, options && options.opts);
  },
});

module.exports = totalhash;
