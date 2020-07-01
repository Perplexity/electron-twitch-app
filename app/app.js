const scopes = [
    "user:read:email"
];

$("#signin").on("click", () => {
    var clientID = 'm3z8aizq826yeemsji48l6tbcee12r';
    var scope = scopes.join("+");
    var url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID}&redirect_uri=http://localhost:9393/&scope=${scope}`;
    location.href = url;
});

$(document).ready(() => {
    var oauthHash = location.hash.substr(1);
    var accessToken = oauthHash.substr(oauthHash.indexOf('access_token=')).split('&')[0].split('=')[1];
    if(accessToken) {
        alert(accessToken);
    }
});