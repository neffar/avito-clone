import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import * as action from '../../store/actions/index';

class Auth extends Component {

    state = {
        email: '',
        password: ''
    };

    inputChangedHandler = (event, { name, value }) => {
        this.setState({ [name]: value });
    };

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.email, this.state.password);
    };

    render() {

        let errorMessage = null;
        if (this.props.error) errorMessage = this.props.error.message;

        return (

            <Grid centered textAlign='center' verticalAlign='middle' style={{ marginTop: 200 }}>
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Header as='h2' inverted color='grey' textAlign='center'>Log-in to your account</Header>

                    <Form onSubmit={this.submitHandler} loading={this.props.loading} error={this.props.error ? true : false} size='large'>
                        <Segment stacked>
                            <Form.Input
                                type='text'
                                name='email'
                                value={this.state.email}
                                icon='user'
                                iconPosition='left'
                                fluid
                                required
                                placeholder='E-mail address'
                                onChange={this.inputChangedHandler} />
                            <Form.Input
                                type='password'
                                name='password'
                                value={this.state.password}
                                icon='lock'
                                iconPosition='left'
                                fluid
                                required
                                placeholder='Password'
                                onChange={this.inputChangedHandler}
                                autoComplete='on' />
                            <Message error header='Erreur' content={errorMessage} />
                            <Button color='teal' fluid size='large'>Sign in</Button>

                            <Link style={{ float: 'right' }} to={{ pathname: '/register' }}>
                                Create new account
                            </Link>

                        </Segment>
                    </Form>

                </Grid.Column>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(action.auth(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);