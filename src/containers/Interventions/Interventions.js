import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Card, Table, Message } from 'semantic-ui-react';
import Spinner from '../../components/Spinner/Spinner';
import DataTable from '../DataTable/DataTable';
import * as actions from '../../store/actions/index';

class Interventions extends Component {

    componentDidMount() {
        // get only my articles
        this.props.getAllInterventions(this.props.token);
    }

    render() {

        let table = null;
        if (this.props.loading) {
            table = <Spinner />;
        } else {
            if (this.props.inters === undefined || this.props.inters.length === 0) {
                table = (
                    <Card fluid>
                        <Card.Content>
                            <Card.Header><Header as='h2'>Mes Annonces</Header></Card.Header>

                            <Table striped fixed textAlign='center' color='blue'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Titre</Table.HeaderCell>
                                        <Table.HeaderCell>Photo</Table.HeaderCell>
                                        <Table.HeaderCell>Prix</Table.HeaderCell>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Date</Table.HeaderCell>
                                        <Table.HeaderCell>Actions</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan='6' textAlign='center'>
                                            <Message compact>La base de données est vide, aucune annonce à afficher</Message>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>

                            </Table>

                        </Card.Content>
                    </Card>
                );
            } else {
                table = <DataTable />;
            }
        }
        return table;
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        inters: state.inter.interventions,
        loading: state.inter.loading,
        error: state.inter.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllInterventions: (token) => dispatch(actions.getAllInterventions(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Interventions);