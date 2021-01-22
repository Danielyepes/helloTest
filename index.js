const express = require('express');
const bodyParser = require("body-parser");

const serviceServices = require('./services/serviceServices');

const app = express();

const port = 3000;

//add dependencias to app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(500);
    res.render({ error: err });
});

//get methods
app.get('/', function (req, res) {
    res.send('HelloTest Api Rest')
})

app.get('/test/services', function (req, res) {
    
    serviceServices.listServices(res);

})


app.listen(port, () => {
    console.log(`Node server running on http://localhost:${port}`);
})