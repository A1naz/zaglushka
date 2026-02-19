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
      console.warn(`[SSI] Файл не найден: ${filePath}`);
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

// Middleware: обрабатываем HTML-файлы с SSI до отдачи статики
app.use((req, res, next) => {
  const urlPath = req.path;

  const candidates = urlPath === '/'
    ? [path.join(ROOT, 'index.html')]
    : [
        path.join(ROOT, urlPath + '.html'),      // /page → page.html
        path.join(ROOT, urlPath, 'index.html'), // /dir/ → dir/index.html
        path.join(ROOT, urlPath),               // прямой путь
      ];

  for (const candidate of candidates) {
    try {
      const stat = fs.statSync(candidate);
      if (stat.isFile() && candidate.endsWith('.html')) {
        const raw = fs.readFileSync(candidate, 'utf8');
        const processed = processSSI(raw);
        console.log(`[SSI] Отдаём: ${candidate}`);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(processed);
      }
    } catch (e) {
      // файл не найден — пробуем следующий вариант
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
