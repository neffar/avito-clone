import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import Toolbar from './components/Toolbar/Toolbar';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Interventions from './containers/Interventions/Interventions';
import EditForm from './containers/EditForm/EditForm';
import NewForm from './containers/NewForm/NewForm';
import NotFound from './components/NotFound/NotFound';
import HomePage from './containers/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import * as actions from './store/actions';

class App extends Component {

    componentWillMount() {
        this.props.onTryAutoSignUp();
    }

    render() {

        let redirect = null;
        let redirect_2 = null;
        if (this.props.location.pathname === '/login') redirect = <Redirect from='/login' to='/' />;
        if (this.props.location.pathname === '/') redirect_2 = <Redirect from='/' to='/login' />;

        let routes = null;
        if (this.props.isAuthenticated) {
            routes = (
                <div>
                    {redirect}
                    <Toolbar />
                    <Container>
                        <Switch>
                            <Route path="/" exact render={() => <HomePage />} />
                            <Route path="/mesAnnonces" exact component={Interventions} />
                            <Route path="/mesAnnonces/edit/:id" exact component={EditForm} />
                            <Route path="/annonce/new" exact component={NewForm} />
                            <Route path="/logout" exact component={Logout} />
                            <Route render={() => <NotFound link='/' />} />
                        </Switch>
                    </Container>

                </div>
            );
        } else {
            routes = (
                <Container>
                    {redirect_2}
                    <Switch>
                        <Route path="/login" exact component={Auth} />
                        <Route render={() => <NotFound link='/login' />} />
                    </Switch>
                </Container>
            );
        }

        return (
            <div>
                {routes}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));