const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();

const cors = require('cors');
app.use(cors());

const ROOT = __dirname;

// Обрабатываем SSI-директивы (<!--# include file="..." -->) как nginx
function processSSI(html) {
  return html.replace(/<!--#\s*include\s+file="([^"]+)"\s*-->/g, (match, filePath) => {
    try {
      const absolutePath = path.join(ROOT, filePath);
      return fs.readFileSync(absolutePath, 'utf8');
    } catch (e) {
      console.warn(`SSI include not found: ${filePath}`);
      return '';
    }
  });
}

// Прокси для статей блога
app.get('/fetch-articles', async (req, res) => {
  try {
    const response = await axios.get('https://blog.harmex.ru/api/articles/getArticles?main=true');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Ошибка при получении данных');
  }
});

// Отдаём HTML-файлы с обработкой SSI
app.get('/*path', (req, res, next) => {
  const urlPath = req.path;

  const candidates = [
    path.join(ROOT, urlPath),
    path.join(ROOT, urlPath + '.html'),
    path.join(ROOT, urlPath, 'index.html'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      if (candidate.endsWith('.html')) {
        const raw = fs.readFileSync(candidate, 'utf8');
        const processed = processSSI(raw);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(processed);
      } else {
        return res.sendFile(candidate);
      }
    }
  }

  next();
});

// Статические файлы (css, js, img и т.д.)
app.use(express.static(ROOT));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Локальный сервер запущен: http://localhost:${PORT}`);
});

