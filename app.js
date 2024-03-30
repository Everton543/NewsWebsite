const express = require('express');
const app = express();
const port = 3000;

const homeRoutes = require('./routes/homeRoutes');
const newsRoutes = require('./routes/newsRoutes');

app.use('/', homeRoutes);
app.use('/api', newsRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});