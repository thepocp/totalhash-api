# totalhash-api

[#totalhash](https://totalhash.cymru.com/api-documentation/) API wrapper

## Install

```shell
npm i totalhash-api
```

## Example

```javascript
const totalhash = require('totalhash-api');

const api = totalhash('id', 'api key');

(async () => {
  const searchResults = await api.search('filename:core.dll');
  const analysisResults = await api.analysis('42493f2b568826215a85529a238dfdddf57a6868');
  const usage = api.usage();
})();
```
