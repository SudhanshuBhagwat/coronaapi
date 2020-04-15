const express = require('express');
const cors = require('cors')({origin: true});
const PORT = 3000;
const routes = require('./routes/routes.js');
const path = require('path');
    
const app = express();
app.use('/', express.static(path.join(__dirname, 'docs')))

/**
 * @api {get} / Base Page
 * @apiName Base
 * @apiGroup Base
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Fuck CORONA"
 *     }
 */
app.get('/', (req, res) => {
    res.json({
        message: `Fuck CORONA`
    });
});

app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname + '/docs/index.html'));
});

app.use('/corona', routes);

app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`);
});