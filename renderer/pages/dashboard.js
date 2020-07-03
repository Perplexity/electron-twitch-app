import '../styles/dashboard.css';
import { isAuthed, getAuthInfo, settings } from '../modules/auth';
import Head from 'next/head';
import UserInfoHeader from '../components/UserInfoHeader';
class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <Head>
                    <title>Dashboard</title>
                </Head>
                <div className="nav-left-sidebar twitch-sidebar">
                    <nav className="nav-header">
                        <UserInfoHeader userId={this.props.auth.user_id} clientId={this.props.auth.client_id} accessToken={settings.get('access_token')} />
                    </nav>
                </div>
                <div className="dashboard-wrapper">

                </div>
            </div>
        );
    }
}

export async function getServerSideProps() {
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