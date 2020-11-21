import React from 'react';
import { connect } from 'react-redux';
import './HomePage.css'
import LeftPanel from '../LeftPanel/LeftPanel';
import RightPanel from '../RightPanel/RightPanel';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout() {
        localStorage.removeItem('user');
        this.props.history.push('/');
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="container remove-padding">
                <section className="main-section">
                    <section className="col-sm-12 col-md-12 col-lg-12 col-xlg-12 gnotes-section">
                        <span>G Notes</span><span onClick={this.logout}>Logout</span>
                    </section>
                    <div className="gnotes-body">
                        <LeftPanel />
                        <RightPanel />
                    </div>
                </section>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    // getUsers: userActions.getAll,
    // deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };