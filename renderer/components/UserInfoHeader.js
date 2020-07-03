import Spinner from 'react-bootstrap/Spinner';
class UserInfoHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }
    render() {
        if (this.state.loading) {
            return <Spinner animation="border"></Spinner>
        }
        return (
            <div>
                <img className="user-icon" src={this.state.userInfo.data[0].profile_image_url}></img>
                <h5>{this.state.userInfo.data[0].display_name}</h5>
                <small>{this.state.userInfo.data[0].email}</small>
            </div>
        );
    }

    async componentDidMount() {
        var myHeaders = new Headers();
        myHeaders.append("Client-ID", this.props.clientId);
        myHeaders.append("Authorization", `Bearer ${this.props.accessToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(`https://api.twitch.tv/helix/users?id=${this.props.userId}`, requestOptions);
        if (response.ok) {
            const userInfo = await response.json();
            this.setState({
                userInfo: userInfo,
                loading: false
            });
        }
    }
}

export default UserInfoHeader;