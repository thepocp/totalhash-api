jest.mock('node-fetch');

import fetch from 'node-fetch';
import { totalhash } from '../src/index';

describe('api.search()', () => {
  it('Works correctly with one found hash', async () => {
    (fetch as any).mockReturnValue(
      Promise.resolve({
        ok: true,
        text: () =>
          Promise.resolve(`
        <?xml version="1.0" encoding="UTF-8"?>
        <response>
        <result name="response" numFound="1" start="0"><doc><str name="sha1">42493f2b568826215a85529a238dfdddf57a6868</str></doc></result>
        </response>    
      `),
      }),
    );

    const api = totalhash('id', 'api_key');
    const result = await api.search('ip:8.8.8.8');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      numFound: 1,
      start: 0,
      doc: [{ sha1: '42493f2b568826215a85529a238dfdddf57a6868' }],
    });
  });

  it('Works correctly with a few found hash', async () => {
    (fetch as any).mockReset();
    (fetch as any).mockReturnValue(
      Promise.resolve({
        ok: true,
        text: () =>
          Promise.resolve(`
        <?xml version="1.0" encoding="UTF-8"?>
        <response>
        <result name="response" numFound="16784" start="0"><doc><str name="sha1">ece28dcc6faf54d6f2e7e4278a2b616b4cc8113e</str></doc><doc><str name="sha1">d62acc7fd9c6e52e1825c5db6de72fa3a6440d6e</str></doc><doc><str name="sha1">2e1a7760af1020a62604df8a852ab6fd31a45693</str></doc><doc><str name="sha1">dd937b1e8f6b55eb7b3a11b0ea0f83963801f67a</str></doc><doc><str name="sha1">793f67bb498a9437d6fbf5465bf44655e2b0d9f3</str></doc><doc><str name="sha1">aa731e74a87c551d23e9b9dd042351e3385168f8</str></doc><doc><str name="sha1">7ade563bf14c44201ca34121d52b3aa4bacd6b50</str></doc><doc><str name="sha1">c1582c833a15f2512c03ba3ef316c0516e54cd3e</str></doc><doc><str name="sha1">94873aadbc05bf39cc78a38122603780859167ab</str></doc><doc><str name="sha1">67b79a9432e99a62d3aaf5e5989f7108698ff074</str></doc></result>
        </response>         
      `),
      }),
    );

    const api = totalhash('id', 'api_key');
    const result = await api.search('');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      numFound: 16784,
      start: 0,
      doc: [
        { sha1: 'ece28dcc6faf54d6f2e7e4278a2b616b4cc8113e' },
        { sha1: 'd62acc7fd9c6e52e1825c5db6de72fa3a6440d6e' },
        { sha1: '2e1a7760af1020a62604df8a852ab6fd31a45693' },
        { sha1: 'dd937b1e8f6b55eb7b3a11b0ea0f83963801f67a' },
        { sha1: '793f67bb498a9437d6fbf5465bf44655e2b0d9f3' },
        { sha1: 'aa731e74a87c551d23e9b9dd042351e3385168f8' },
        { sha1: '7ade563bf14c44201ca34121d52b3aa4bacd6b50' },
        { sha1: 'c1582c833a15f2512c03ba3ef316c0516e54cd3e' },
        { sha1: '94873aadbc05bf39cc78a38122603780859167ab' },
        { sha1: '67b79a9432e99a62d3aaf5e5989f7108698ff074' },
      ],
    });
  });
});
