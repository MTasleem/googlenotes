import React from 'react';
import { connect } from 'react-redux';
import './HomePage.css'
import LeftPanel from '../LeftPanel/LeftPanel';
import RightPanel from '../RightPanel/RightPanel';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideNav: false,
            closeIcon: false
        }
        this.logout = this.logout.bind(this)
        this.handleNavBar = this.handleNavBar.bind(this);
        this.closeLeftPanel = this.closeLeftPanel.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        this.setState({ hideNav: window.innerWidth <= 760 ? true : false, closeIcon: window.innerWidth <= 760 ? true : false });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }


    logout() {
        localStorage.removeItem('user');
        this.props.history.push('/');
    }

    handleNavBar() {
        this.setState({
            hideNav: false
        })
    }

    closeLeftPanel() {
        this.setState({
            hideNav: !this.state.hideNav
        })
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="container remove-padding">
                <section className="main-section">
                    <section className="col-sm-12 col-md-12 col-lg-12 col-xlg-12 gnotes-section">
                        <span>G Notes</span><span onClick={this.logout}>Logout</span>
                    </section>
                    <div className="gnotes-body pos-relative">
                        {
                            this.state.hideNav ?
                                <div className="menu" onClick={this.handleNavBar}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                :
                                <React.Fragment>
                                    {
                                        this.state.closeIcon ?
                                            <span className="close pos-absolute" onClick={this.closeLeftPanel}>&#10006;</span>
                                            : null
                                    }
                                    <LeftPanel style={{ "display": !this.state.hideNav }} />
                                </React.Fragment>
                        }
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