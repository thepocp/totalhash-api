const parseSearchResult = data => {
  const { doc, $ } = data.response.result[0];

  return JSON.stringify({
    doc: doc.map(({ str }) => ({ [str[0].$.name]: str[0]._ })),
    numFound: $.numFound,
    start: $.start,
  });
};

const parseAnalysisResult = ({ analysis }) => {
  return JSON.stringify(analysis);
};

module.exports = { parseSearchResult, parseAnalysisResult };
