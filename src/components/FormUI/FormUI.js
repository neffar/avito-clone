import React from 'react';

import { Form, Button, Message } from 'semantic-ui-react';

const formUI = props => {

    return (

        <Form onSubmit={props.submitHandler} loading={props.loading} success={props.success} error={props.error}>

            <Form.Group inline unstackable>
                <Form.Input type='text' name='title' value={props.title} onChange={props.inputChangedHandler} required placeholder='Titre complet' width={9} />
                <Form.Input type='number' name='price' value={props.price} onChange={props.inputChangedHandler} required placeholder='Prix' width={9} />
            </Form.Group>

            <Form.Group>
                <Form.Input type='text' name='description' value={props.description} onChange={props.inputChangedHandler} placeholder="Description détaillée..." width={9} />
                <Form.Input type='file' name='photo' value={props.photo} onChange={props.inputChangedHandler} label="Image" width={9} />
            </Form.Group>

            <Message success header='Success' content={props.successContent} />
            <Message error header='Erreur' content={props.errorContent} />
            <Button.Group floated='right'>
                <Button content='Cancel' disabled={props.disabled} onClick={props.emptyDataHandler} />
                <Button.Or />
                <Button positive content={props.content} />
            </Button.Group>
        </Form>
    );
}

export default formUI;