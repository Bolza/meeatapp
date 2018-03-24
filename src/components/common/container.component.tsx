import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  LayoutAnimation
} from "react-native";

import { Spinner, FullScreenMessage } from "./";

interface State {
  [key: string]: any;
}
interface Props {
  [key: string]: any;
}

class Container extends Component<Props, State> {
  state = {
    loading: this.props.loading,
    message: this.props.message,
    error: this.props.error,
    spring: this.props.spring,
    fade: this.props.fade,
    success: this.props.success,
    springAnim: new Animated.Value(0),
    fadeAnim: new Animated.Value(0)
  };

  componentWillReceiveProps(newProps) {
    LayoutAnimation.configureNext(CustomLayoutLinear);
    this.setState({ ...this.state, ...newProps });
    return true;
  }

  // TODO we need to extract this shit
  renderState() {
    if (this.state.loading) {
      return <Spinner />;
    } else if (this.state.error) {
      return <Text style={styles.error}>{this.state.error}</Text>;
    } else if (this.state.message) {
      return <Text style={styles.message}>{this.state.message}</Text>;
    } else if (this.state.success) {
      return (
        <FullScreenMessage
          message={"Event Created!"}
          onPress={() => this.theOnPress()}
        />
      );
    }
  }

  renderChildren() {
    return this.props.children;
  }

  renderContent() {
    if (this.hasState()) {
      return <View>{this.renderState()}</View>;
    }
    return this.renderChildren();
  }

  theOnPress() {
    this.setState({
      success: false,
      error: false
    });
  }

  render() {
    const opacity = this.hasState() ? 1 : 0;
    const contentStyle = [styles.content] as any;
    return (
      <View style={this.props.style}>
        {this.renderChildren()}
        <View style={contentStyle}>{this.renderContent()}</View>
      </View>
    );
  }

  private hasState() {
    return (
      this.state.loading ||
      this.state.message ||
      this.state.error ||
      this.state.success
    );
  }
}

const styles = StyleSheet.create({
  error: {
    marginTop: 10,
    alignSelf: "center",
    color: "#ff0000"
  },
  message: {
    marginTop: 10,
    alignSelf: "center",
    color: "#0000ff"
  },
  content: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

const CustomLayoutLinear = {
  duration: 25,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  }
};

export { Container };
