import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { EventListToZoomAction } from '../event-list/event-list.actions';

interface State { [key: string]: any }
interface Props { [key: string]: any }

class EventOwnedComponent extends Component<Props, State> {
    state = {}

    render() {
        const item = this.props.item;
        if (!item) return null;
        return (
            <ListItem
                containerStyle={styles.container}
                key={item.id}
                title={item.details.name}
                subtitle={`${item.slots} available seats`}
                onPress={this.navigateToZoom.bind(this, item.id)}
            />
        );
    }

    private navigateToZoom(id: string) {
        this.props.dispatch(EventListToZoomAction(id));
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#bbbbbb'
    }
});

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(EventOwnedComponent);
