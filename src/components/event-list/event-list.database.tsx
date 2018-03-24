import GeoFire from 'geofire';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/reduce';
import { getCurrentUser, getEventLocationsRef, getLocation, getEventRef } from '../../database';
import { ListLocationalEventType } from '../../types';

let currPos = [0, 0];
let locationWatcherRef;
let geoQuery;
const SENSIBILITY = 0.020; // 20 metres
const RANGE = 10; // km
const eventListeners = {};

export function observeEventsAroundYou(): Observable<ListLocationalEventType> {
    const subj = new BehaviorSubject({} as ListLocationalEventType);
    const eventsRef = getEventLocationsRef();
    const geofireRef = new GeoFire(eventsRef);
    getLocation().clearWatch(locationWatcherRef);
    locationWatcherRef = getLocation().watchPosition(loc => {
        // const tempPos = [loc.coords.latitude, loc.coords.longitude];
        const tempPos = [51.507351, -0.127758];
        const userMovement = GeoFire.distance(tempPos, currPos);
        if (userMovement > SENSIBILITY) {
            currPos = [...tempPos];
            if (geoQuery) geoQuery.cancel();
            geoQuery = geofireRef.query({ center: currPos, radius: RANGE });

            geoQuery.on('key_entered', function(key, location, distance) {
                subj.next({type: 'enter', id: key, location, distance});
            });
            geoQuery.on('key_exited', function(key, location, distance) {
                subj.next({type: 'exit', id: key});
            });
        }
    }, () => { /**/ }, { enableHighAccuracy: true });

    return subj.asObservable();
}

export function observeEvent(eventId): any {
    const subj = new Subject();
    const evRef = getEventRef(eventId);
    eventListeners[eventId] = evRef.on('value', v => subj.next(v.val()))
    return subj;
}

export function forgetEvent(eventId) {
    const evRef = getEventRef(eventId);
    evRef.off('value', eventListeners[eventId]);
    delete eventListeners[eventId];
}