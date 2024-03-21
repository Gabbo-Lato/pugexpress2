const express = require('express');
const path = require('path');
const songsData = require('./songs.json'); 

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { songs: songsData.songs });
});

app.get('/song/:song_id', (req, res) => {
    const songId = req.params.song_id;
    const song = songsData.songs.find(song => song.song_id === songId);
    if (song) {
        res.render('songs', { song });
    } else {
        res.status(404).send('Song not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});