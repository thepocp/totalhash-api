jest.mock('request-promise-native');

import * as request from 'request-promise-native';
import { totalhash } from '../src/index';

describe('api.usage()', () => {
  it('Gets response from the api', async () => {
    (request as any).mockReturnValue(Promise.resolve('4 of 300'));

    const api = totalhash('id', 'api_key');
    const result = await api.usage();

    expect(request).toHaveBeenCalledTimes(1);
    expect(result).toBe('4 of 300');
  });
});
