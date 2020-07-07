import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
class BannedUsersTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            bans: [],
            cursor: null
        }
    }

    render() {
        if (this.state.loading) {
            return <Spinner variant="dark" animation="border" />
        }
        return (
            <Table borderless size="sm">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Expires</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.bans.map((ban, i) => (
                        <tr key={i}>
                            <td>{ban.user_name}</td>
                            <td>{ban.expires_at ? ban.expires_at : "Never"}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">
                            <div>
                                <Button variant="dark" className="float-left" onClick={this.loadPreviousUsers.bind(this)}>Prev</Button>
                                {this.state.cursor ? <Button variant="dark" className="float-right" onClick={this.loadNextUsers.bind(this)}>Next</Button> : null}
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        );
    }

    async componentDidMount() {
        this.loadBannedUsers();
    }

    async loadPreviousUsers() {
        this.loadBannedUsers(this.state.cursor, true);
    }

    async loadNextUsers() {
        this.loadBannedUsers(this.state.cursor, false, true);
    }

    async loadBannedUsers(cursor, isBefore = false, isAfter = false) {
        this.setState({
            bans: [],
            cursor: null,
            loading: true
        });
        var myHeaders = new Headers();
        myHeaders.append("Client-ID", this.props.authInfo.clientId);
        myHeaders.append("Authorization", `Bearer ${this.props.authInfo.accessToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let url = `https://api.twitch.tv/helix/moderation/banned?broadcaster_id=${this.props.authInfo.userId}`;
        if (isBefore) {
            url += `&before=${cursor}`;
        }
        if (isAfter) {
            url += `&after=${cursor}`;
        }
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            const bans = await response.json();
            this.setState({
                bans: bans.data,
                cursor: bans.pagination.cursor,
                loading: false
            });
        } else {
            this.loadBannedUsers();
        }
    }
}

export default BannedUsersTable;