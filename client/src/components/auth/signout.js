import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOutUser } from '../../actions';
import { withRouter } from 'react-router';

class SignOut extends Component {
    componentWillMount() {
        this.props.signOutUser();
    }

    render() {
        return (
            <div>
                You've successfully logged out!
            </div>
        )
    }
}

export default withRouter(connect(null, { signOutUser })(SignOut));
