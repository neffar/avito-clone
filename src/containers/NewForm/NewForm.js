import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header, Card } from 'semantic-ui-react';
import FormUI from '../../components/FormUI/FormUI';
import * as actions from '../../store/actions/index';

class NewForm extends Component {

    state = {
        title: '',
        avatar: null,
        price: '',
        description: '',
    };

    inputChangedHandler = (event, { name, value }) => {
        this.setState({ 
            [name]: value,
            avatar: event.target.files
         });
    };

    submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('title', this.state.title);
        formData.append('avatar', this.state.avatar[0], this.state.avatar[0].name);
        formData.append('price', this.state.price);
        formData.append('description', this.state.description);
        
        this.props.addIntervention(formData, this.props.token);
        this.emptyDataHandler();
    };

    emptyDataHandler = () => {
        this.setState({
            title: '',
            avatar: '',
            price: '',
            description: '',
        });
    };

    componentWillMount() {
        this.props.resetState();
    }

    render() {

        return (
            <Card fluid>
                <Card.Content>
                    <Header as='h2'>Nouvelle annonce</Header><br />
                    <FormUI
                        submitHandler={this.submitHandler}
                        inputChangedHandler={this.inputChangedHandler}
                        emptyDataHandler={this.emptyDataHandler}
                        loading={this.props.loading}
                        success={this.props.success}
                        error={this.props.error ? true : false}

                        title={this.state.title}
                        avatar={this.state.avatar}
                        price={this.state.price}
                        description={this.state.description}

                        successContent='Vous avez ajoutés(ées) les données avec succes'
                        errorContent='Erreur est produit'
                        content='Ajouter' />
                </Card.Content>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        loading: state.inter.loading,
        success: state.inter.success,
        error: state.inter.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetState: () => dispatch(actions.resetState()),
        addIntervention: (intervention, token) => dispatch(actions.addIntervention(intervention, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);