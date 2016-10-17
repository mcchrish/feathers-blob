import feathers from 'feathers-client';
import fetch from 'node-fetch';
import { getBase64DataURI } from 'dauria';

const app = feathers()
  .configure(feathers.rest('http://localhost:3030').fetch(fetch))
  .configure(feathers.hooks());


const content = new Buffer('hello world!');
const contentType = 'text/plain';
const contentUri = getBase64DataURI(content, contentType);
app.service('/blobs').create({ id: 'files/test.txt', uri: contentUri })
  .then(file => {
    console.log('Created new file!');

    app.service('/blobs').remove('files/test.txt')
      .then(removedFile => {
        console.log('File removed!');
      });
  });
