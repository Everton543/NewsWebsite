require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY;

exports.getRecentNews = async (req, res) => {
    let country = req.params.country; // Assuming country code is passed as a URL parameter
    if(country == null){
        country = 'us';
    }
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const filteredArticles = response.data.articles.filter(article => {
            const isRemoved = article.title.includes("[Removed]") || (article.description && article.description.includes("[Removed]"));
            return !isRemoved;
        }).slice(0, 10);
        res.json(filteredArticles);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).send('Failed to fetch news');
    }
};
