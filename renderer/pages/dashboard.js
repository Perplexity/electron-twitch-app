import '../styles/dashboard.css';
import { isAuthed, getAuthInfo } from '../modules/auth';
class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="nav-left-sidebar twitch-sidebar">
                    <nav className="nav-header">
                        <img src=""></img>
                        <h5>{this.props.auth.login}</h5>
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