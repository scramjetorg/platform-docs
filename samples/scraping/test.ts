import { scrap } from './scrap';

const BASE_URL = 'https://time.is/';

(async () => {
  const result = await scrap(BASE_URL, "#clock");
  console.log(`RESULT: ${result}`);
})();
