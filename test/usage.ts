jest.mock('node-fetch');

import fetch from 'node-fetch';
import { totalhash } from '../src/index';

describe('api.usage()', () => {
  it('Gets response from the api', async () => {
    (fetch as any).mockReturnValue(
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('4 of 300'),
      }),
    );

    const api = totalhash('id', 'api_key');
    const result = await api.usage();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toBe('4 of 300');
  });
});
