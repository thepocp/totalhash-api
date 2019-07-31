import * as request from 'request-promise-native';
import { parseAnalysisResult, parseSearchResult } from './parsers';
import {
  performAnalysisRequest,
  performSearchRequest,
  performUsageRequest,
} from './requests';

export const totalhash = (
  id: string,
  apiKey: string,
  opts?: request.RequestPromiseOptions,
) => ({
  analysis: async (ioc: string): Promise<object> => {
    const options = { id, apiKey, opts };
    const data = await performAnalysisRequest(options, ioc);
    try {
      return parseAnalysisResult(data) as object;
    } catch {
      throw new Error(data);
    }
  },

  search: async (message: string, offset?: number) => {
    const options = { id, apiKey, opts };
    const data = await performSearchRequest(options, message, offset);
    try {
      return parseSearchResult(data);
    } catch {
      throw new Error(data);
    }
  },

  usage: () => {
    const options = { id, apiKey, opts };
    return performUsageRequest(options);
  },
});
