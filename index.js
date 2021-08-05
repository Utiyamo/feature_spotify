const express = require('express'),
app = express(),
port = process.env.PORT || 3001;

const routes = require('./src/routes');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));
app.use(bodyParser.json());
routes(app);

app.listen(port);
console.log(`Message: RESTful API Server started on http://localhost:${port}`);