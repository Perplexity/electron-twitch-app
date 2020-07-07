import Spinner from 'react-bootstrap/Spinner';
import Enumerable from 'linq';
class ChannelStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }

    render() {
        if (this.state.loading) {
            return <Spinner variant="dark" animation="border"></Spinner>
        }
        return this.state.live ? <small><span className="badge badge-success">LIVE</span></small> : <small><span className="badge badge-secondary">Offline</span></small>;
    }

    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Client-ID", this.props.authInfo.clientId);
        myHeaders.append("Authorization", `Bearer ${this.props.authInfo.accessToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`https://api.twitch.tv/helix/streams?user_id=${this.props.authInfo.userId}`, requestOptions);
        if (response.ok) {
            const streams = await response.json();
            const live = Enumerable.from(streams.data).any((stream) => { return stream.type == "live" });
            this.setState({
                live: live,
                loading: false
            });
        }
    }
}

export default ChannelStatus;