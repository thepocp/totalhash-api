const { parseAnalysisResult, parseSearchResult } = require('./parsers');
const { performAnalysisRequest, performSearchRequest, performUsageRequest } = require('./requests');

const totalhash = (id, apiKey, opts) => ({
  analysis: async ioc => {
    const data = await performAnalysisRequest(id, apiKey, opts, ioc);
    return parseAnalysisResult(data);
  },

  search: async (message, offset) => {
    const data = await performSearchRequest(id, apiKey, opts, message, offset);
    return parseSearchResult(data);
  },

  usage: () => performUsageRequest(id, apiKey, opts),
});

module.exports = totalhash;
