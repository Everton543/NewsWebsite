const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

const homeRoutes = require('./routes/homeRoutes');
const newsRoutes = require('./routes/newsRoutes');

app.use(express.static('public'));
app.use('/', homeRoutes);
app.use('/api', newsRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});