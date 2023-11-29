const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

require('./routes/routes.js')(app, fs);

const server = app.listen(port, () => {
  console.log(`Listening on port %s `, server.address().port);
});
