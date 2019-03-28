const express = require('express');
const hbs = require('hbs');
const proxy = require('http-proxy-middleware');
const port = 3000;

// init app
const app = express();

// proxy websocket requests to webpack dev server
app.use('/sockjs-node', proxy({target: 'http://localhost:3001/', ws: true}));

// proxy bundle requests to webpack dev server
app.use('/dist', proxy({target: 'http://localhost:3001/', ws: true}));
//app.use('/dist', express.static(__dirname + '/../dist')); // prod

// configure handlebars
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/../src/partials');

// define locals
hbs.localsAsTemplateData(app);
app.locals.titleSuffix = ' - Departement Omgeving - Linked Data';

// define routes
app.get('/', (req, res) => {
    res.render('department', {
        title: 'Departement Omgeving',
        titleSuffix: ' - Linked Data',
    });
});

app.listen(port, () => console.log(`Dev server listening on port ${port}!`));
