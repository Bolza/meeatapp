import React, { Component } from 'react';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
// import { Header } from './components/common';
// import Login from './components/login.component';
import Router from './router';

 const config = {
    // apiKey: 'AIzaSyA3D_frhPdNG2vYG0QAKMwe4-xI2K8-VyQ',
    // authDomain: 'manager-956c7.firebaseapp.com',
    // databaseURL: 'https://manager-956c7.firebaseio.com',
    // projectId: 'manager-956c7',
    // storageBucket: 'manager-956c7.appspot.com',
    // messagingSenderId: '449402475100'
    apiKey: 'AIzaSyBFC1NHvenIIRSDGroVWzGpAqmT14YeOyA',
    authDomain: 'meat-5432f.firebaseapp.com',
    databaseURL: 'https://meat-5432f.firebaseio.com',
    projectId: 'meat-5432f',
    storageBucket: 'meat-5432f.appspot.com',
    messagingSenderId: '260439457350'
};

const logger = (store) => next => action => {
    if (!console.group) {
        console.group = () => {return};
        console.groupEnd = () => {return};
        console.log = () => {return};
    };
    console.group(action.type);
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
};

class App extends Component {

    componentWillMount() {
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(
            reducers,
            { auth: {} },
            applyMiddleware(ReduxThunk, logger)
        );

        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    {/*<Header text="Tech Stack" />*/}
                    <Router />
                    {/*<Login />*/}
                </View>
            </Provider>
        );
    }
}

export default App;
