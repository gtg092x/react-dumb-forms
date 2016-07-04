import express from 'express';
import bodyParser from 'body-parser';

import validate from 'validate.js';

import {schemas} from 'react-dumb-forms-examples-lib';

const PORT = 5000;

const app = express();

app.use(bodyParser.json());


function validationMiddleware(schema) {
  return function(req, res, next) {
    const model = req.body;
    const validation = validate(model, schema, {fullMessages: false}) || {};
    if (Object.keys(validation).length === 0) {
      return next();
    }
    return res.status(400).json({
      error: validation
    });
  };
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/simple-form', validationMiddleware(schemas.SimpleFormSchema), function(req, res) {
  res.json({message: 'looks good!'});
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
