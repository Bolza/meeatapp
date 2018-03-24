import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

interface State { [key: string]: any }
interface Props { [key: string]: any }

class Card extends Component<Props, State> {
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
        flexWrap: 'wrap',
        flexDirection: 'column',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    }
});

export { Card };
