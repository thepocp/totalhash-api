import * as crypto from 'crypto';
import * as Fetch from 'node-fetch';
import fetch from 'node-fetch';

interface Options {
  id: string;
  apiKey: string;
  opts?: Fetch.Request;
}

const hmac = (key: string, data: string) =>
  crypto
    .createHmac('sha256', key)
    .update(data)
    .digest('hex');

const API_URL = 'https://api.totalhash.com';

const requestAsString = async (
  url: string,
  options?: Fetch.Request,
): Promise<string> => {
  const result = await fetch(url, options);
  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return await result.text();
};

const performSearchRequest = (
  options: Options,
  message: string,
  offset?: number,
): Promise<string> => {
  const { apiKey, id, opts } = options;
  const sign = hmac(apiKey, message);
  const encodedMessage = encodeURI(message);

  const url = `${API_URL}/search/${encodedMessage}&id=${id}&sign=${sign}${
    offset ? `&start=${offset}` : ''
  }`;

  return requestAsString(url, opts);
};

const performAnalysisRequest = (
  options: Options,
  ioc: string,
): Promise<string> => {
  const { apiKey, id, opts } = options;
  const sign = hmac(apiKey, ioc);
  const url = `${API_URL}/analysis/${ioc}&id=${id}&sign=${sign}`;

  return requestAsString(url, opts);
};

const performUsageRequest = (options: Options): Promise<string> => {
  const { apiKey, id, opts } = options;
  const sign = hmac(apiKey, 'usage');
  const url = `${API_URL}/usage/id=${id}&sign=${sign}`;

  return requestAsString(url, opts);
};

export { performSearchRequest, performAnalysisRequest, performUsageRequest };
