const Store = require('electron-store');
const settings = new Store();
let authInfo = {};

const isAuthed = new Promise(async (resolve) => {
    let authToken = settings.get('access_token');
    if (authToken) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "OAuth lojycc8xfmnsn6b9u4jtvkjf7nygff");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch("https://id.twitch.tv/oauth2/validate", requestOptions);
        if(response.ok) {
            authInfo = await response.json();
            resolve(true);
        }
        resolve(true);
    }
    resolve(false);
});

function getAuthInfo() {
    return authInfo;
}

module.exports.isAuthed = isAuthed;
module.exports.settings = settings;
module.exports.getAuthInfo = getAuthInfo;