import React from 'react';

import { Table, Icon, Menu } from 'semantic-ui-react';

const paginationFooter = () => {

    return (
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='4'>
                    <Menu floated='right' pagination>
                        <Menu.Item as='a' icon><Icon name='chevron left' /></Menu.Item>
                        <Menu.Item as='a' active>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon><Icon name='chevron right' /></Menu.Item>
                    </Menu>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    );
};

export default paginationFooter;