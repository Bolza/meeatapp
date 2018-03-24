import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card } from 'react-native-elements';
import { isEmpty, forOwn, forEach } from 'lodash';

import { Input, Stepper, HideableView, Container, LocationCard } from '../common';
import { GeoRegion } from '../../types';
import { EventZoomFetchAction, EventZoomJoinAction } from './event-zoom.actions';
import { UserList } from './user-list.component';

interface State { [key: string]: any };
interface Props { [key: string]: any }

class EventZoomComponent extends Component<Props, State> {

    componentWillMount() {
        // this.state = {};
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <LocationCard item={this.props.item.details} />
                </Card>
                <Card>
                    <Text>Free Slots | {this.props.item.slots}</Text>
                </Card>
                <Card>
                    <Text>Date | {this.props.item.date}</Text>
                </Card>
                <Card>
                    <Text>Guests</Text>
                    <UserList items={this.props.item.guests} />
                </Card>
                <Card>
                    <Text>you the owner | {this.props.item.isOwned ? 'YES' : 'NO'}</Text>
                </Card>
                <Card>
                    <Text>aleady a guest? | {this.props.item.isGuest ? 'YES' : 'NO'}</Text>
                </Card>
                <Card>
                    <Button
                        raised
                        disabled={this.props.item.isGuest}
                        containerViewStyle={styles.creationButton}
                        backgroundColor='#1faadb'
                        icon={{name: 'done'}}
                        onPress={() => this.joinTheEvent()}
                    />
                </Card>
            </ScrollView>
        );
    }

    private joinTheEvent() {
        this.props.dispatch(EventZoomJoinAction(this.props.item.id));
        // this.setState({ completeVisible: true });
    }
}

const styles = StyleSheet.create({

} as any);

const mapStateToProps = (state) => {
    return {...state.eventZoom};
};

export default connect(mapStateToProps)(EventZoomComponent);