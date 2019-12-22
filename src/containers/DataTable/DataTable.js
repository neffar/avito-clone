import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Header, Card, Table, Icon, Confirm, Popup, Image } from 'semantic-ui-react';
import DataModal from '../../components/DataModal/DataModal';
import PaginationFooter from '../../components/PaginationFooter/PaginationFooter';
import * as actions from '../../store/actions/index';

class DataTable extends Component {

    state = {
        id: null,
        open: false
    };

    show = (value, id) => this.setState({ open: value, id: id });

    deleteInterventionHandler = () => {
        this.props.deleteIntervention(this.state.id, this.props.token);
        this.setState({ open: false });
    };

    importAll = r => {
        return r.keys().map(r);
    }

    compareFunction = avatar => {
        const firstSplit = avatar.split('/');
        const secondSplit = firstSplit[2].split('.');
        const compareStr = '/static/media/' + secondSplit[0];
        return compareStr;
    }

    render() {

        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        
        const images = this.importAll(require.context('../../server/public/uploads/', false, /\.(png|jpe?g|svg)$/));

        return (
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
                            {
                                this.props.inters.map(inter => (
                                    <Table.Row key={inter.id}>
                                        <Table.Cell>
                                            {inter.title}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Image src={images.find(k => k.startsWith(this.compareFunction(inter.avatar.url)))} size='small' alt='Annonce_image' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            {inter.price} DH
                                        </Table.Cell>
                                        <Table.Cell>
                                            {inter.description}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {(new Date(inter.created_at)).toLocaleDateString('fr-MA', DATE_OPTIONS)}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <DataModal
                                                id={inter.id}
                                                title={inter.title}
                                                avatar={inter.avatar}
                                                price={inter.price}
                                                description={inter.description}
                                                date={(new Date(inter.created_at)).toLocaleDateString('fr-MA', DATE_OPTIONS)} />

                                            <Link to={{ pathname: '/mesAnnonces/edit/' + inter.id }}>
                                                <Popup
                                                    trigger={<Icon link name='edit' color='orange' />}
                                                    content='Modifier' />
                                            </Link>

                                            <Popup content='Supprimer !'
                                                trigger={
                                                    <span>
                                                        <Icon onClick={() => this.show(true, inter.id)} link name='trash alternate' color='red' />
                                                        <Confirm
                                                            open={this.state.open}
                                                            onCancel={() => this.show(false, null)}
                                                            onConfirm={() => this.deleteInterventionHandler()} />
                                                    </span>
                                                } />

                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>

                        <PaginationFooter />

                    </Table>

                </Card.Content>
            </Card>

        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        inters: state.inter.interventions,
        error: state.inter.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteIntervention: (id, token) => dispatch(actions.deleteIntervention(id, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);