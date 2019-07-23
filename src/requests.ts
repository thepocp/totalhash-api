import * as crypto from 'crypto';
import * as request from 'request-promise-native';

interface Options {
  id: string;
  apiKey: string;
  opts?: request.RequestPromiseOptions;
}

const hmac = (key: string, data: string) =>
  crypto
    .createHmac('sha256', key)
    .update(data)
    .digest('hex');

const API_URL = 'https://api.totalhash.com';

const performSearchRequest = (
  options: Options,
  message: string,
  offset?: number,
): request.RequestPromise<string> => {
  const { apiKey, id, opts } = options;
  const sign = hmac(apiKey, message);
  const url = `${API_URL}/search/${message}&id=${id}&sign=${sign}${
    offset ? `&start=${offset}` : ''
  }`;

  return request(url, opts);
};

const performAnalysisRequest = (
  options: Options,
  ioc: string,
): request.RequestPromise<string> => {
  const { apiKey, id, opts } = options;
  const sign = hmac(apiKey, ioc);
  const url = `${API_URL}/analysis/${ioc}&id=${id}&sign=${sign}`;

  return request(url, opts);
};

const performUsageRequest = (
  options: Options,
): request.RequestPromise<string> => {
  const { apiKey, id, opts } = options;
  const sign = hmac(apiKey, 'usage');
  const url = `${API_URL}/usage/id=${id}&sign=${sign}`;

  return request(url, opts);
};

export { performSearchRequest, performAnalysisRequest, performUsageRequest };
