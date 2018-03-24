import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements'
import { AppState } from '../../types';
import EventOwned from '../event-owned/event-owned.component';
import { EventListToZoomAction, EventListFetchAroundUserAction } from './event-list.actions';

interface State { [key: string]: any }
interface Props { [key: string]: any }

class EventListComponent extends Component<Props, State> {

    componentWillMount() {
        this.props.dispatch(EventListFetchAroundUserAction());
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <EventOwned item={this.props.eventOwned}></EventOwned>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    style={{flex: 1}}
                    data={this.props.list}
                    renderItem={this.eventListItem.bind(this)}
                />
            </View>
        );
    }

    private keyExtractor(item: any) {
        return item.id;
    }

    private navigateToZoom(id: string) {
        this.props.dispatch(EventListToZoomAction(id));
    }

    private eventListItem({item}) {
        return <ListItem
            title={item.details.name}
            subtitle={`${item.slots} available seats, ${Math.round(item.distance)} km`}
            onPress={this.navigateToZoom.bind(this, item.id)}
        />;
    }
}

// const styles = StyleSheet.create({
//     label: {
//         fontSize: 18,
//         paddingLeft: 20,
//     }
// } as any);

const mapStateToProps = (state: AppState) => {
    return {...state.events};
};

export default connect(mapStateToProps)(EventListComponent);
