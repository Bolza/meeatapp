import firebase from 'firebase';
import GeoFire from 'geofire';
import {Actions} from 'react-native-router-flux';
import { EventCreationState, LocationDetails} from '../../types';
import { DB_EVENTS, DB_EVENT_LOCATIONS } from '../../router';

export const EVENT_CREATION_SET_LOCATION_ACTION_TYPE = '[EventCreation] SetLocation';
export const EventCreationSetLocationAction = (payload: LocationDetails) => {
    return {
        type: EVENT_CREATION_SET_LOCATION_ACTION_TYPE,
        payload,
    };
};

export const EVENT_CREATION_SET_DATE_ACTION_TYPE = '[EventCreation] SetDate';
export const EventCreationSetDateAction = (payload) => {
    return {
        type: EVENT_CREATION_SET_DATE_ACTION_TYPE,
        payload
    };
};

export const EVENT_CREATION_SET_SLOTS_ACTION_TYPE = '[EventCreation] SetSlots';
export const EventCreationSetSlotsAction = (payload) => {
    return {
        type: EVENT_CREATION_SET_SLOTS_ACTION_TYPE,
        payload
    };
};

export const CREATE_EVENT_ACTION = '[EventCreation] Calling Firebase API';
export const CreateEventAction = (payload) => {
    return (dispatch, getState) => {
        dispatch({ type: CREATE_EVENT_ACTION });
        // XXX: we have to get the current state of the store because the slots
        // might not be set byn the user (solve by create new smart cmp for that)
        const currentStore = getState().eventCreation;
        const eventsRef = firebase.database().ref(DB_EVENT_LOCATIONS)
        const geofireRef = new GeoFire(eventsRef);
        const ref = firebase.database().ref(DB_EVENTS).push();

        ref.set(eventObjectFactory(currentStore, ref.key))
            .then(res => {
                geofireRef.set(ref.key, [currentStore.details.latitude, currentStore.details.longitude]);
                // TODO: is the currentStore that we are setting actually used?
                dispatch(CreateEventSuccessAction(currentStore));
            })
            .catch(err => dispatch(CreateEventFailAction(err)));
    };
};

export const CREATE_EVENT_SUCCESS_ACTION = '[EventCreation] Create Event Success';
export const CreateEventSuccessAction = (event) => {
    return (dispatch) => {
        dispatch({ type: CREATE_EVENT_SUCCESS_ACTION });
        Actions.EventList({type: 'reset'});
    };
};

export const CREATE_EVENT_FAIL_ACTION = '[EventCreation] Create Event Fail';
export const CreateEventFailAction = (error) => {
    return {
        type: CREATE_EVENT_FAIL_ACTION,
        payload: error
    };
};

const eventObjectFactory = (originalPayload: EventCreationState, id): any => {
    const {details, date, slots} = originalPayload;
    const owner = firebase.auth().currentUser.uid;
    return {
        id,
        owner: owner,
        details: details,
        date: date,
        slots: slots,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
};
