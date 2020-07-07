import BannedUsersTable from './BannedUsersTable';
class BannedUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }

    render() {
        return (
            <div className="component-view">
                <h1>Banned Users</h1>
                <div className="component-body">
                    <BannedUsersTable authInfo={this.props.authInfo} />
                </div>
            </div>
        );
    }
}

export default BannedUsers;