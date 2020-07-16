import ModeratorsTable from './ModeratorsTable';
class Moderators extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }

    render() {
        return (
            <div className="component-view">
                <h1>Moderators</h1>
                <div className="component-body">
                    <ModeratorsTable authInfo={this.props.authInfo} />
                </div>
            </div>
        );
    }
}

export default Moderators;