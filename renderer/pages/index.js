import Router from "next/router";
const Store = require('electron-store');
const settings = new Store();

class Login extends React.Component {
    componentDidMount() {
        const oauthHash = location.hash.substr(1);
        let accessToken = oauthHash.substr(oauthHash.indexOf('access_token=')).split('&')[0].split('=')[1];
        if (accessToken) {
            settings.set('access_token', accessToken);
        }
        accessToken = settings.get('access_token');
        if (accessToken) {
            Router.push('/main');
        }
    }
    static async getInitialProps({ res }) {
        accessToken = settings.get('access_token');
        if (accessToken) {
            if (res) {
                res.writeHead(301, {
                    Location: '/main'
                });
            } else {
                Router.push('/main');
            }
        }
        const scopes = [
            "user:read:email"
        ];
        const clientID = 'm3z8aizq826yeemsji48l6tbcee12r';
        const scope = scopes.join("+");
        const url = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID}&redirect_uri=http://localhost:9393/&scope=${scope}`;
        return { loginUrl: url }
    }

    render() {
        return (
            <div>
                <style jsx global>{
                    `
                        html, body {
                            height: 100%;
                        }
                        
                        body {
                            background-color: #f5f5f5;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                        }
                        
                        .logo {
                            max-height: 64px;
                        }
                        
                        .signin-form {
                            width: 100%;
                            max-width: 330px;
                            padding: 15px;
                            margin: 0 auto;
                        }
                        
                        .btn-outline-twitch {
                            color: #7A2FE7;
                            border-color: #7A2FE7;
                        }
                        
                        .btn-outline-twitch:hover {
                            color: #fff;
                            background-color: #7A2FE7;
                            border-color: #7A2FE7;
                        }
                        
                        .btn-outline-twitch:focus, .btn-outline-twitch.focus {
                            box-shadow: 0 0 0 0.2rem rgba(122, 50, 231, 0.5);
                        }
                        
                        .btn-outline-twitch.disabled, .btn-outline-twitch:disabled {
                            color: #7A2FE7;
                            background-color: transparent;
                        }
                        
                        .btn-outline-twitch:not(:disabled):not(.disabled):active, .btn-outline-twitch:not(:disabled):not(.disabled).active, .show>.btn-outline-twitch.dropdown-toggle {
                            color: #fff;
                            background-color: #7A2FE7;
                            border-color: #7A2FE7;
                        }
                        `
                }</style>
                <div className="signin-form">
                    <img className="logo" src="/images/twitch-logo.svg"></img>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div>
                        <a href={this.props.loginUrl}><button className="btn btn-lg btn-outline-twitch">Sign in with Twitch</button></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login