import '../public/styles/dashboard.css';
import { isAuthed, getAuthInfo, settings } from '../modules/auth';
import Head from 'next/head';
import UserInfoHeader from '../components/UserInfoHeader';
import ChannelStatus from '../components/ChannelStatus';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {user_id, client_id} = this.props.auth;
        const accessToken = settings.get('access_token');
        return (
            <div className="dashboard">
                <Head>
                    <title>Dashboard</title>
                </Head>
                <div className="nav-left-sidebar twitch-sidebar">
                    <nav className="nav-header">
                        <UserInfoHeader userId={user_id} clientId={client_id} accessToken={accessToken} />
                        <ChannelStatus  userId={user_id} clientId={client_id} accessToken={accessToken}/>
                    </nav>
                </div>
                <div className="dashboard-wrapper">

                </div>
            </div>
        );
    }
}

export async function getServerSideProps({res}) {
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