import React, { Component } from "react";
import { StyleSheet, Text, Animated, View } from "react-native";

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
    success: this.props.success,
    springAnim: new Animated.Value(0)
  };

  componentWillReceiveProps(newProps) {
    this.setState({ ...this.state, ...newProps });
    return true;
  }

  renderContent() {
    // console.log(this.state);
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
    return this.props.children || null;
  }

  theOnPress() {
    this.setState({ success: false });
  }

  render() {
    this.toggleSubview();

    return (
      <Animated.View
        style={[
          styles.subView,
          { transform: [{ translateY: this.state.springAnim }] }
        ]}
      >
        <FullScreenMessage
          message={"Event Created!"}
          onPress={() => this.theOnPress()}
        />
      </Animated.View>
    );
  }

  toggleSubview() {
    let toValue = 0;
    let isHidden =
      this.state.loading ||
      this.state.message ||
      this.state.error ||
      this.state.success;
    if (!isHidden) {
      toValue = 500;
    }

    Animated.spring(this.state.springAnim, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8
    }).start();

    isHidden = !isHidden;
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
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 500
  }
});

export { Container };
