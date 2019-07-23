import * as request from 'request-promise-native';
import { parseAnalysisResult, parseSearchResult } from './parsers';
import {
  performAnalysisRequest,
  performSearchRequest,
  performUsageRequest,
} from './requests';

const totalhash = (
  id: string,
  apiKey: string,
  opts?: request.RequestPromiseOptions,
) => ({
  analysis: async (ioc: string): Promise<object> => {
    const options = { id, apiKey, opts };
    const data = await performAnalysisRequest(options, ioc);
    return parseAnalysisResult(data) as object;
  },

  search: async (message: string, offset?: number) => {
    const options = { id, apiKey, opts };
    const data = await performSearchRequest(options, message, offset);
    return parseSearchResult(data);
  },

  usage: () => {
    const options = { id, apiKey, opts };
    performUsageRequest(options);
  },
});

export default totalhash;
