import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export const Spinner = (props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator 
                size={props.size || 'large'} 
            />
        </View>
    ); 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
