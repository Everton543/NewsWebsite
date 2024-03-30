const fs = require('fs');
const path = require('path');

function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

exports.index = async (req, res) => {
    try {
        const layoutPath = path.join(__dirname, '../public/layout.html');
        const contentPath = path.join(__dirname, '../views/home.html');

        // Read layout and content files asynchronously
        const layout = await readFileAsync(layoutPath);
        const content = await readFileAsync(contentPath);

        // Replace placeholders in layout with content and other dynamic values
        let htmlContent = layout
            .replace('<$title>', 'Home')
            .replace('<$css>', '')//'<link rel="stylesheet" href="/css/style.css">')
            .replace('<$js>', '')//'<script src="/js/script.js"></script>')
            .replace('<$content>', content);

        res.send(htmlContent);
    } catch (err) {
        console.error("Error loading page:", err);
        res.status(500).send('Error loading page');
    }
};
