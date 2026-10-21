const http = require('http');
const dayjs = require('dayjs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`[İSTEK] Yöntem: ${req.method} | Yol: ${req.url}`);

    if (req.method !== 'GET') {
        res.writeHead(405, { 
            'Content-Type': 'text/plain; charset=utf-8',
            'Allow': 'GET'
        });
        res.end('İzin verilmeyen yöntem (Method Not Allowed)');
        return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="tr">
            <head><meta charset="UTF-8"><title>Ana Sayfa</title></head>
            <body>
                <h1>BMH231 Web Programlama - Ödev 1</h1>
                <p>Ana sayfaya hoş geldiniz.</p>
                <a href="/hakkimda">Hakkımda Sayfasına Git</a>
            </body>
            </html>
        `);
    } 
    else if (pathname === '/hakkimda') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="tr">
            <head><meta charset="UTF-8"><title>Hakkımda</title></head>
            <body>
                <h1>Hakkımda</h1>
                <p><strong>Ad Soyad:</strong> Harun Ziya Cırık</p>
                <p><strong>Öğrenci Numarası:</strong> 16008125089</p>
                <p>Yozgat Bozok Üniversitesi Bilgisayar Mühendisliği öğrencisiyim.</p>
                <a href="/">Ana Sayfaya Dön</a>
            </body>
            </html>
        `);
    } 
    else if (pathname === '/api/ders') {
        const dersBilgisi = {
            kod: "BMH231",
            ad: "Web Programlama",
            gun: "Cuma"
        };
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(dersBilgisi, null, 2));
    } 
    else if (pathname === '/api/agep') {
        const hedefTarih = dayjs('2026-11-01');
        const bugun = dayjs();
        const kalanGun = hedefTarih.diff(bugun, 'day');

        const agepBilgisi = {
            son_teslim: "01.11.2026",
            kalan_gun: kalanGun >= 0 ? kalanGun : 0
        };
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(agepBilgisi, null, 2));
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Sayfa bulunamadı');
    }
});

server.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});
