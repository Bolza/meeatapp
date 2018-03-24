import firebase from 'firebase';
import GeoFire from 'geofire';
import { DB_EVENTS, DB_EVENT_LOCATIONS } from './router';

export function getEventsRef() {
    return firebase.database().ref(DB_EVENTS);
}

export function getEventLocationsRef() {
    return firebase.database().ref(DB_EVENT_LOCATIONS);
}

export function getEventRef(eventId) {
    return firebase.database().ref(DB_EVENTS).child(eventId);
}

export function getUserRef(userId) {
    return firebase.database().ref().child('users').child(userId);
}

export function getCurrentUser() {
    return firebase.auth().currentUser;
}

export function getLocation() {
    return navigator.geolocation;
}
