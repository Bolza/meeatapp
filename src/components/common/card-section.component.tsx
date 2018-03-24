import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

interface State { [key: string]: any }
interface Props { [key: string]: any }

class CardSection extends Component<Props, State> {
    state = {}

    render() {
        return (
            <View style={[styles.container, this.props.style] as any}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 0,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    }
});

export { CardSection };
