import React, { Component } from 'react';

import { Menu, Icon } from 'semantic-ui-react';
import Logo from '../Logo/Logo';
import { withRouter } from "react-router-dom";

class Toolbar extends Component {

    itemClickHandler = (event, { name }) => {
        this.props.history.push({ pathname: name });
    }

    render() {

        return (
            <Menu stackable secondary inverted icon='labeled'>
                <Menu.Item>
                    <Logo />
                </Menu.Item>
                <Menu.Item name='/' active={this.props.location.pathname === '/'} onClick={this.itemClickHandler}>
                    Accueille
                </Menu.Item>
                <Menu.Item name='/mesAnnonces' active={this.props.location.pathname.startsWith('/mesAnnonces')} onClick={this.itemClickHandler}>
                    Mes annonces
                </Menu.Item>
                <Menu.Item name='/annonce/new' active={this.props.location.pathname.startsWith('/annonce/new')} onClick={this.itemClickHandler}>
                    Déposer une annonce
                </Menu.Item>
                <Menu.Item position='right' name='/logout' active={this.props.location.pathname.startsWith('/logout')} onClick={this.itemClickHandler}>
                    <Icon name='user close' />
                    Quitter
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(Toolbar);