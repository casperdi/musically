const express = require("express")
const path = require('path');
const app = express()

app.use(express.static('public'))


app.get('/edit', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/edit.html'));
});

app.get('/register', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});

app.get('/front', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/front.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/logout', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/logout.html'));
});

app.get('/profile', function(req, res) {
    res.sendFile(path.join(__dirname, '/views/profile.html'));
});

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log("server started on port " + PORT))