import '../public/styles/dashboard.css';
import { isAuthed, getAuthInfo, settings } from '../modules/auth';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faHammer } from '@fortawesome/free-solid-svg-icons'
import UserInfoHeader from '../components/UserInfoHeader';
import ChannelStatus from '../components/ChannelStatus';
import BannedUsers from '../components/BannedUsers';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        const { user_id, client_id } = props.auth;
        const accessToken = settings.get('access_token');
        const authInfo = {
            userId: user_id,
            clientId: client_id,
            accessToken: accessToken
        }
        this.state = {
            selection: null,
            authInfo: authInfo
        };
        console.log(authInfo);
        this.setSelection = this.setSelection.bind(this);
    }
    render() {
        return (
            <div className="dashboard">
                <Head>
                    <title>Dashboard</title>
                </Head>
                <div className="nav-left-sidebar twitch-sidebar">
                    <div className="nav-header">
                        <UserInfoHeader authInfo={this.state.authInfo} />
                        <ChannelStatus authInfo={this.state.authInfo} />
                    </div>
                    <div className="menu-list">
                        <ul className="navbar-nav flex-column">
                            <li className="nav-divider">Users</li>
                            <li className="nav-item">
                                <a data-selection="banned-users" className="nav-link active" href="#" onClick={this.setSelection}><FontAwesomeIcon icon={faBan} /> Banned Users</a>
                                <a data-selection="moderators" className="nav-link" href="#" onClick={this.setSelection}><FontAwesomeIcon icon={faHammer} /> Moderators</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="dashboard-wrapper">
                    <div className="dashboard-body">
                        {this.getSelectedComponent(this.state.selection)}
                    </div>
                </div>
            </div>
        );
    }
    getSelectedComponent(selection) {
        switch (selection) {
            case "banned-users":
                return <BannedUsers authInfo={this.state.authInfo} />
            default:
                return <h1>404 Not Found</h1>
        }
    }
    setSelection(e) {
        this.setState({
            selection: e.target.getAttribute('data-selection'),
            authInfo: this.state.authInfo
        });
        e.preventDefault();
    }
}

export async function getServerSideProps({ res }) {
    const authed = await isAuthed;
    if (!authed) {
        if (res) {
            res.writeHead(301, {
                Location: '/'
            });
            res.end();
            return {};
        }
    }
    return {
        props: {
            auth: getAuthInfo()
        }
    };
}

export default Dashboard;