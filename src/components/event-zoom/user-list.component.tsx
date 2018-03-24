import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet, Text } from 'react-native';

interface State { [key: string]: any };
interface Props { [key: string]: any }

class UserListComponent extends Component<Props, State> {
    render() {
        let listItems;
        if (this.props.items.length) {
            listItems = this.props.items.map((item) =>
                <ListItem
                    hideChevron
                    roundAvatar
                    avatar={item.photo}
                    key={item.id}
                    title={item.name}
                />
            );
        } else {
            listItems = <Text>No Users</Text>
        }
        return (
            <List>
                {listItems}
            </List>
        );
    }
}

const styles = StyleSheet.create({

} as any);

export {UserListComponent as UserList};