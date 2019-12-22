import React from 'react';

import { Button, Icon, Item, Label } from 'semantic-ui-react';

function importAll(r) {
    return r.keys().map(r);
}

const product = props => {

    const images = importAll(require.context('../../server/public/uploads/', false, /\.(png|jpe?g|svg)$/));
    const avatar = props.avatar.url;
    const firstSplit = avatar.split('/');
    const secondSplit = firstSplit[2].split('.');
    const compareStr = '/static/media/' + secondSplit[0];

    return (
        <Item>
            <Item.Image src={images.find(k => k.startsWith(compareStr))} size='medium' alt='Annonce_image' />
            <Item.Content>
                <Item.Header as='a'>{props.title}</Item.Header>
                <Item.Meta>
                    <span className='cinema'>{props.date}</span>
                </Item.Meta>
                <Item.Meta>
                    <span className='price'>Prix</span>
                    <Label>{props.price} DH</Label>
                </Item.Meta>
                <Item.Description>{props.description}</Item.Description>
                <Button primary floated='right'>
                    Acheter
                    <Icon name='right chevron' />
                </Button>
            </Item.Content>
        </Item>
    );
}

export default product;