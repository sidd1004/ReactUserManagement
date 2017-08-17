import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { signinUser } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Signin extends Component {

    renderField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    type={field.type}
                    className="form-control"
                    {...field.input}
                />
            </div>
        )
    }

    handleFormSubmit(values) {
        this.props.signinUser(values, () =>
            this.props.history.push('/home')
        );
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
                    <Field
                        label="Email ID"
                        name="email"
                        type="email"
                        component={this.renderField}
                    />
                    <Field
                        label="Password"
                        name="password"
                        type="password"
                        component={this.renderField}
                    />
                    {this.renderAlert()}
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        )

    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'SignInFields'
})(withRouter(connect(mapStateToProps, { signinUser })(Signin)));
