import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
// import {GoogleSignin} from 'react-native-google-signin';
import { User } from '../../types';

export const EMAIL_CHANGED_ACTION = 'Email changed';
export const EmailChangedAction = text => {
  return {
    type: EMAIL_CHANGED_ACTION,
    payload: text
  };
};

export const PASSWORD_CHANGED_ACTION = 'Password changed';
export const PasswordChangedAction = text => {
  return {
    type: PASSWORD_CHANGED_ACTION,
    payload: text
  };
};

export const LOGIN_ATTEMPT_ACTION = '[Login] Email and Password';
export const LoginAttemptAction = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_ATTEMPT_ACTION });
    // const provider = new firebase.auth.GoogleAuthProvider();
    // // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // firebase.auth().signInWithRedirect(provider).then(function(result) {
    //     const token = result.credential.accessToken;
    //     const user = result.user;
    //     console.log(user, token)
    // }).catch((error) => {
    //     // ...
    // });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => dispatch(LoginSuccessAction(user)))
      // .catch(() => dispatch(LoginFailAction()))
      .catch(() => {
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then(user => dispatch(LoginSuccessAction(user)))
        //     .catch(() => dispatch(LoginFailAction()));
      });
  };
};

function updateUser(userData: User) {
  const user = firebase.auth().currentUser;
  userData.id = user.uid;
  const userRef = firebase
    .database()
    .ref()
    .child('users')
    .child(user.uid)
    .set(userData);
}

export const LOGIN_GOOGLE_ATTEMPT_ACTION = '[Login] With Google';
export const LoginWithGoogleAction = () => {
  return dispatch => {
    dispatch({ type: LOGIN_GOOGLE_ATTEMPT_ACTION });
    // GoogleSignin
    //     .signIn()
    //     .then((user) => {
    //         const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    //         firebase.auth().signInWithCredential(credential)
    //             .then(() => {
    //                 updateUser(user);
    //                 dispatch(LoginSuccessAction(user))
    //             })
    //             .catch((err) => {
    //                 dispatch(LoginFailAction(err))
    //             });
    //     })
    //     .catch((err) => {
    //         dispatch(LoginFailAction(err))
    //     })
    //     .done();
  };
};

export const LOGIN_SUCCESS_ACTION = '[Login] Success';
export const LoginSuccessAction = user => {
  return dispatch => {
    dispatch({ type: LOGIN_SUCCESS_ACTION, payload: user });
    Actions.Meeat();
    Actions.EventList();
  };
};

export const LOGIN_FAIL_ACTION = '[Login] Fail';
export const LoginFailAction = err => {
  return {
    type: LOGIN_FAIL_ACTION,
    payload: err
  };
};
