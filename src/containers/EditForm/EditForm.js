import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Card, Icon, Popup } from 'semantic-ui-react';
import FormUI from '../../components/FormUI/FormUI';
import * as actions from '../../store/actions/index';

class EditForm extends Component {

    closeFormHandler = () => {
        this.props.history.push({ pathname: '/mesAnnonces' });
    }

    submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        /*
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        */

        formData.append('title', this.props.title);
        formData.append('avatar', this.props.avatar);
        formData.append('price', this.props.price);
        formData.append('description', this.props.description);

        this.props.editIntervention(formData, this.props.match.params.id, this.props.token);
    }

    componentDidMount() {
        this.props.getInterventionById(this.props.match.params.id, this.props.token);
    }    

    render() {

        let theEditForm = null;
        if (this.props.loading) {
            theEditForm = <FormUI loading={this.props.loading} content='Modifier' />;
        } else {
            theEditForm = <FormUI
                submitHandler={this.submitHandler}
                inputChangedHandler={(event) => this.props.inputChangedHandler(event)}
                loading={this.props.loading}
                success={this.props.success}
                error={this.props.error ? true : false}

                title={this.props.title}
                avatar={this.props.avatar}
                price={this.props.price}
                description={this.props.description}

                successContent='Vous avez modifiés(ées) les données avec succes'
                errorContent='Erreur est produit'
                disabled
                content='Modifier' />;
        }

        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Popup
                            trigger={<Icon link name='arrow alternate circle left outline' color='orange' size='large' style={{ float: 'right' }} onClick={this.closeFormHandler} />}
                            content='Go back' />
                        <Header as='h2'>Modifier l'annonce</Header>
                    </Card.Header><br />

                    {theEditForm}

                </Card.Content>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,

        title: state.inter.title,
        avatar: '',
        price: state.inter.price,
        description: state.inter.description,

        loading: state.inter.loading,
        success: state.inter.success,
        error: state.inter.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getInterventionById: (id, token) => dispatch(actions.getInterventionById(id, token)),
        inputChangedHandler: event => dispatch(actions.inputChangedHandler(event)),
        editIntervention: (intervention, id, token) => dispatch(actions.editIntervention(intervention, id, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);