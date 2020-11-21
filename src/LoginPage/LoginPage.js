import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { alertActions, userActions } from "../_actions";


import { browserHistory, Redirect } from 'react-router'

const userDetails = [
    { username: "encora", password: "encora" },
    { username: "divya", password: "gohil" }
];

const myStyle = {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center"
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            checkValidUser: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        // 
        const { username, password } = this.state;
        if (username && password) {
            let validUser = userDetails.filter(user => user['username'] === username && user['password'] === password)
            console.log(validUser)
            if (validUser && validUser.length) {
                this.setState({
                    checkValidUser: (<div className="alert alert-success">
                        <strong>Login!</strong> successful.
                    </div>),
                    submitted: true
                })
                localStorage.setItem('user', JSON.stringify({ username, password }))
                this.props.history.push('/')
            } else {
                this.setState({
                    checkValidUser: (<div className="alert alert-danger">
                        <strong>Login!</strong> failed.
                    </div>),
                    submitted: false
                })
            }
        } else {
            this.setState({
                checkValidUser: (<div className="alert alert-danger">
                    All Fields are required.
                </div>),
                submitted: false
            })
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted, checkValidUser } = this.state;
        return (
            <div className="col-sm-12 col-md-12 col-lg-12" style={myStyle}>
                <section className="col-sm-5 col-md-5 col-lg-5 col-xlg-5">
                    {checkValidUser}
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                            {loggingIn &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            {/* <Link to="/register" className="btn btn-link">Register</Link> */}
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    // login: userActions.login,
    // logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };