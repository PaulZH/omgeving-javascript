const express = require('express');
const app = express();
const port = 3000;
let hbs = require('hbs');

// configure handlebars
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/../src/partials');

// define static paths
app.use('/dist', express.static(__dirname + '/../dist'));
app.use('/img', express.static(__dirname + '/../src/img'));

// define locals
hbs.localsAsTemplateData(app);
app.locals.titleSuffix = ' - Departement Omgeving - Linked Data'

// define routes
app.get('/', (req, res) => {
    res.render('department', {
        title: 'Departement Omgeving',
        titleSuffix: ' - Linked Data',
    });
});

app.listen(port, () => console.log(`Dev server listening on port ${port}!`));
