const express = require('express');
const SteamUser = require('steam-user');

const app = express();
const user = new SteamUser();

const logOnOptions = {
  accountName: process.env.STEAM_USER,
  password: process.env.STEAM_PASS
};

user.logOn(logOnOptions);

user.on('loggedOn', () => {
  console.log(`${logOnOptions.accountName} - Successfully logged on`);
  user.setPersona(SteamUser.EPersonaState.Online);
  user.gamesPlayed([440, 730, 570]);
});

// simple web route to keep Render happy
app.get('/', (req, res) => {
  res.send('Steam idler is running ✅');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Web server running...');
});
