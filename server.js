const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Hier sagen wir dem Server: "Alle Bilder, CSS und HTML-Dateien in diesem Ordner sind öffentlich"
app.use(express.static(__dirname));

// Startseite festlegen
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// === DER LIVE CHAT TEIL ===
io.on('connection', (socket) => {
  console.log('🦆 Eine Ente ist dem Chat beigetreten!');

  socket.on('chat message', (msg) => {
    // Nachricht an ALLE verteilen (auch an den Sender zurück)
    io.emit('chat message', msg);
  });
});

// Server starten
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('-----------------------------------------------');
  console.log(`🚀 Server läuft! Geh auf: http://localhost:${PORT}`);
  console.log('-----------------------------------------------');
});