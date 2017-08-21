import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { signupUser } from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type={field.type}
                    className="form-control"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    handleFormSubmit(values) {
        this.props.signupUser(values, () =>
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
                        label="Email ID:"
                        name="email"
                        type="email"
                        component={this.renderField}
                    />
                    <Field
                        label="Password:"
                        name="password"
                        type="password"
                        component={this.renderField}
                    />
                    <Field
                        label="Confirm Password:"
                        name="confirmPassword"
                        type="password"
                        component={this.renderField}
                    />
                    {this.renderAlert()}
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const errors = {};
    if (values.password) {
        if ((values.password).length < 6)
            errors.password = "Enter a password of minimum 6 characters"
    }
    if (!values.password) {
        errors.password = "Enter a password"
    }
    if (values.password !== values.confirmPassword) {
        errors.password = "Passwords must match";
    }
    if (!(mailformat).test(values.email)) {
        errors.email = "Enter a valid Email ID";
    }
    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    validate,
    form: 'SignUpFields'
})(connect(mapStateToProps, { signupUser })(Signup));
