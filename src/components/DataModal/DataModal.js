import React, { Component } from 'react';

import { Icon, Header, Button, Modal, Grid, Segment, Popup, Image } from 'semantic-ui-react';

class DataModal extends Component {

  state = { modalOpen: false };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

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

    const images = this.importAll(require.context('../../server/public/uploads/', false, /\.(png|jpe?g|svg)$/));

    return (
      <Modal
        trigger={
          <Popup
            trigger={<Icon onClick={this.handleOpen} link name='eye' color='blue' />}
            content='Détails' />
        }
        centered={false}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon>

        <Modal.Header icon='archive'>Détails</Modal.Header>

        <Modal.Content>
          <Modal.Description>

            <Grid columns={3} divided>
              <Grid.Row textAlign='center' stretched>
                <Grid.Column>
                  <Header sub>Annonce</Header>
                  <Segment>Produit: <strong>{this.props.title}</strong></Segment>
                  <Segment>Prix: <strong>{this.props.price} DH</strong></Segment>
                </Grid.Column>
                <Grid.Column>
                  <Header sub>Image</Header>
                  <Segment>Identifiant: <strong>{this.props.id}</strong></Segment>
                  <Segment><Image src={images.find(k => k.startsWith(this.compareFunction(this.props.avatar.url)))} size='medium' alt='Annonce_image'/></Segment>
                </Grid.Column>
                <Grid.Column>
                  <Header sub>Détails</Header>
                  <Segment>Description: <strong>{this.props.description}</strong></Segment>
                  <Segment>Date : <strong>{this.props.date}</strong></Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button color='green' onClick={this.handleClose} inverted>
            <Icon name='checkmark' /> OK
          </Button>
        </Modal.Actions>

      </Modal>
    );
  }
}

export default DataModal;