import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { COLORS, FONT_SIZE } from "../../styles";

interface State {
  [key: string]: any;
}
interface Props {
  [key: string]: any;
}

class FullScreenMessage extends Component<Props, State> {
  state = {
    message: this.props.message
  };

  componentWillReceiveProps(newProps) {
    this.setState({ ...this.state, message: newProps.message });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Icon
          raised
          size={FONT_SIZE.ultra}
          name={"done-all"}
          color={COLORS.text}
          containerStyle={styles.containerStyle}
          onPress={() => this.props.onPress()}
        />
        <Text style={styles.text}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: COLORS.defaultPrimary,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  containerStyle: {
    backgroundColor: COLORS.darkPrimary
  },
  text: {
    color: COLORS.text,
    fontSize: FONT_SIZE.large
  }
});

export { FullScreenMessage };
