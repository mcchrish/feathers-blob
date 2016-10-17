import AWS from 'aws-sdk';
import FsBlobStore from 'fs-blob-store';
import { join } from 'path';
import feathers from 'feathers';
import rest from 'feathers-rest';
import bodyParser from 'body-parser';
import BlobService from '../src';

const blobStore = FsBlobStore(join(__dirname, 'blobs'));

const blobService = BlobService({
  Model: blobStore
});

// Create a feathers instance.
var app = feathers()
  // Enable REST services
  .configure(rest())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}))
  .use('/blobs', blobService);

// A basic error handler, just like Express
app.use(function(error, req, res, next){
  res.json(error);
});

// Start the server
module.exports = app.listen(3030);

console.log('feathers-blob-store service running on 127.0.0.1:3030');
