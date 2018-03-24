import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";
import { isEmpty, forOwn } from "lodash";

interface State {
  [key: string]: any;
}
interface Props {
  [key: string]: any;
}

class LocationCardComponent extends Component<Props, State> {
  render() {
    if (!this.props.item) return null;
    return (
      <View>
        <Card style={{ justifyContent: "space-between" }}>
          <Text style={styles.details}>{this.props.item.name}</Text>
          <Text style={styles.details}>{this.props.item.rating}</Text>
          <Text style={styles.details}>{this.props.item.address}</Text>
          <Text style={styles.details}>{this.props.item.phone}</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({} as any);

export { LocationCardComponent as LocationCard };
