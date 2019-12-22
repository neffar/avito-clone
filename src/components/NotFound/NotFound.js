import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Header, Message } from 'semantic-ui-react';

const NotFound = props => (
    <Grid centered verticalAlign='middle' style={{ marginTop: 200 }}>
        <Grid.Column style={{ maxWidth: 500 }} textAlign='center'>
            <Header as='h1' inverted color='grey'>404</Header>
            <Message info>
                <Message.Header>Page introuvable</Message.Header><br />
                <Link to={props.link} color='blue'>Return to Home Page</Link>
            </Message>
        </Grid.Column>
    </Grid>
);

export default NotFound;