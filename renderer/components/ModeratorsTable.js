import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
class ModeratorsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            moderators: [],
            cursor: null
        }
    }

    render() {
        if (this.state.loading) {
            return <div className="text-center"><Spinner variant="dark" animation="border" /></div> 
        }
        return (
            <Table borderless size="sm">
                <thead>
                    <tr>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.moderators.map((mod, i) => (
                        <tr key={i}>
                            <td>{mod.user_name}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
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
        this.loadModerators();
    }

    async loadPreviousUsers() {
        this.loadModerators(this.state.cursor, true);
    }

    async loadNextUsers() {
        this.loadModerators(this.state.cursor, false, true);
    }

    async loadModerators(cursor, isBefore = false, isAfter = false) {
        this.setState({
            moderators: [],
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
        let url = `https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${this.props.authInfo.userId}`;
        if (isBefore) {
            url += `&before=${cursor}`;
        }
        if (isAfter) {
            url += `&after=${cursor}`;
        }
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            const moderators = await response.json();
            this.setState({
                moderators: moderators.data,
                cursor: moderators.pagination.cursor,
                loading: false
            });
        } else {
            this.loadModerators();
        }
    }
}

export default ModeratorsTable;