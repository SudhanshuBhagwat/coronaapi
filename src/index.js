const express = require('express');
const cors = require('cors')({origin: true});
const PORT = 3000;
const routes = require('./routes/routes.js');

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: `Fuck CORONA`
    });
});

app.use('/corona', routes);

app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`);
});