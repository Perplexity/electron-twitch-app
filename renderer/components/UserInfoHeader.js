import Spinner from 'react-bootstrap/Spinner';
class UserInfoHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }

    render() {
        if (this.state.loading) {
            return <Spinner variant="dark" animation="border"></Spinner>
        }
        const { profile_image_url, display_name, email } = this.state.userInfo;
        return (
            <div>
                <img className="user-icon" src={profile_image_url}></img>
                <h5>{display_name}</h5>
                <small>{email}</small>
            </div>
        );
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

        const response = await fetch(`https://api.twitch.tv/helix/users?id=${this.props.authInfo.userId}`, requestOptions);
        if (response.ok) {
            const userInfo = await response.json();
            this.setState({
                userInfo: userInfo.data[0],
                loading: false
            });
        }
    }
}

export default UserInfoHeader;