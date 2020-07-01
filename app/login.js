const Store = require('electron-store');
const settings = new Store();
const scopes = [
    "user:read:email"
];

$("#signin").on("click", () => {
    const clientID = 'm3z8aizq826yeemsji48l6tbcee12r';
    const scope = scopes.join("+");
    const url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID}&redirect_uri=http://localhost:9393/&scope=${scope}`;
    location.href = url;
});

$(document).ready(async () => {
    try {
        const oauthHash = location.hash.substr(1);
        let accessToken = oauthHash.substr(oauthHash.indexOf('access_token=')).split('&')[0].split('=')[1];
        if (accessToken) {
            settings.set('access_token', accessToken);
        }
        accessToken = settings.get('access_token');
        if (accessToken) {
            alert(accessToken);
        }
    } catch (err) {
        console.log('Something failed with access_token.', err);
    }
});