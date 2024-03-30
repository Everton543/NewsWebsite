const express = require('express');
const homeRoutes = require('./routes/homeRoutes');

const app = express();
const port = 3000;

app.use('/', homeRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});