/* eslint-disable max-len */
import React, { Component } from "react";
import { Text, StyleSheet, Button, View, Image } from "react-native";
import { connect } from "react-redux";
// import {GoogleSignin} from 'react-native-google-signin';
import Icon from "react-native-vector-icons/FontAwesome";

import { LoginWithGoogleAction } from "./login.actions";
import { AppState } from "../../types";
import { IOS_CLIENT_ID } from "../../constants";
/* eslint-enable max-len */

interface State {
  [key: string]: any;
}
interface Props {
  [key: string]: any;
}

class LoginGoogleComponent extends Component<Props, State> {
  render() {
    return (
      <View>
        {/* <Image
                    style={{width: 50, height: 50}}
                    source={require('../../assets/img/gicon-200.png')}
                /> */}
        <Icon.Button
          name="google"
          backgroundColor="#fff"
          color="#000"
          onPress={this.signin.bind(this)}
        >
          SignIn with Google
        </Icon.Button>

        <Button title="SignIn with Google" onPress={this.signin.bind(this)} />
      </View>
    );
  }

  private signin() {
    // GoogleSignin.configure({
    //   iosClientId: IOS_CLIENT_ID
    // })
    //   .then(isOk => {
    //     this.props.dispatch(LoginWithGoogleAction());
    //   })
    //   .done();
  }
}

const mapStateToProps = (state: AppState) => {
  return {};
};

const LoginGoogle = connect(mapStateToProps)(LoginGoogleComponent);
export { LoginGoogle };
