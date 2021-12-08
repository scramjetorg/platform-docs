'use strict';
const { getRss } = require('./rss-execute');
const { scrap } = require('./scrap');
const qm = require('qminer'); // Use node 10.18.1

const url = 'https://stackoverflow.com/feeds/tag?tagnames=node.js&sort=newest';

const base = new qm.Base({
  mode: 'createClean',
  schema: [{ name: 'rss', fields: [{ name: 'text', type: 'string' }] }],
});

(async () => {
  const result = await getRss(url);
  const store = base.store('rss');

  //   const contents = await Promise.all(
  //     result.map(async (url) => {
  //       const content = await scrap(url, '#mainbar');
  //       //   console.log(content);
  //       return content;
  //     })
  //   );

  //   contents.forEach((text) => store.push({ text }));

  //   console.log('DEBUG STORE:');
  //   console.log(store.allRecords);

  store.push({ text: 'This pen is green.' });
  store.push({ text: 'This pen is yellow.' });
  store.push({ text: 'This marker is yellow.' });

  const distribution = store.allRecords.aggr({
    name: 'test',
    type: 'keywords',
    field: 'text',
  });

  console.log('DISTRIBUTION:');
  console.log(distribution);
  distribution.keywords.forEach((obj) => {
    console.log(obj.keyword, obj.weight);
  });
})();
