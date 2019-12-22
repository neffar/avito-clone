import React, { Component } from 'react';
import { connect } from 'react-redux';

import Product from '../../components/Product/Product'
import { Header, Card, Item, Message } from 'semantic-ui-react'
import * as actions from '../../store/actions/index';

class HomePage extends Component {

    componentDidMount() {
        this.props.getAllInterventions(this.props.token);
    }

    render() {
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        let product = null;
        if (this.props.inters === undefined || this.props.inters.length === 0) {
            product = (
                <Card fluid>
                    <Card.Content>
                        <Card.Header><Header as='h2'>Liste des annonces</Header></Card.Header>
                        <Item.Group divided>
                            <Message
                                warning
                                header='Manque de données!'
                                content='La base de donées est vide, ou la connexion avec le serveur a échoué. il est peut-être inaccessible.'
                            />
                        </Item.Group>
                    </Card.Content>
                </Card>
            );
        } else {
            product = (
                <Card fluid>
                    <Card.Content>
                        <Card.Header><Header as='h2'>Liste des annonces</Header></Card.Header>
                        <Item.Group divided>
                            {
                                this.props.inters.map(inter => (
                                    <Product
                                        key={inter.id}
                                        avatar={inter.avatar}
                                        title={inter.title}
                                        date={(new Date(inter.created_at)).toLocaleDateString('fr-MA', DATE_OPTIONS)}
                                        description={inter.description}
                                        price={inter.price} />
                                ))
                            }
                        </Item.Group>
                    </Card.Content>
                </Card>
            );
        }

        return product;
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        inters: state.inter.interventions,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllInterventions: (token) => dispatch(actions.getAllInterventions(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);