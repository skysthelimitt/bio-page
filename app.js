var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

let lastfm_api_key = process.env.LASTFM_API_KEY;

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get("/api/getLastFM/*", async (req, res) => {
  if(req["url"].includes("currentlyListening")) {
    const listening = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=skysthelimitdev&api_key=${lastfm_api_key}&format=json&limit=1&i=${Math.random * 100000}`);
    listening_data = await listening.json();
    if(JSON.stringify(listening_data["recenttracks"]["track"][0]).includes('{"nowplaying":"true"}')) {
      res.send(`{"song": ${JSON.stringify(listening_data["recenttracks"]["track"][0])}}`);
    } else {
      res.send('{"song": false}')
    }
  }
  if(req["url"].includes("topSong")) {
    const listening = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=skysthelimitdev&api_key=${lastfm_api_key}&format=json&limit=1&period=7day&i=${Math.random * 100000}`);
    listening_data = await listening.json();
    res.send(`{"song": ${JSON.stringify(listening_data["toptracks"]["track"][0])}}`);
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;