import * as fetch from 'node-fetch';
import { parseAnalysisResult, parseSearchResult } from './parsers';
import {
  performAnalysisRequest,
  performSearchRequest,
  performUsageRequest,
} from './requests';

export const totalhash = (
  id: string,
  apiKey: string,
  opts?: fetch.Request,
) => ({
  analysis: async (ioc: string) => {
    const options = { id, apiKey, opts };
    const data = await performAnalysisRequest(options, ioc);
    try {
      const parsed = await parseAnalysisResult(data);
      return parsed as object;
    } catch {
      throw new Error(data);
    }
  },

  search: async (message: string, offset?: number) => {
    const options = { id, apiKey, opts };
    const data = await performSearchRequest(options, message, offset);
    try {
      const parsed = await parseSearchResult(data);
      return parsed;
    } catch {
      throw new Error(data);
    }
  },

  usage: async () => {
    const options = { id, apiKey, opts };
    const data = await performUsageRequest(options);

    return data;
  },
});
