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
import { getEventRef, getUserRef, getCurrentUser } from '../../database';
import { objectValuesToArray } from '../../helpers';
import { User } from '../../types';

let callback;
let ref;

export function observeEvent(eventId) {
    const subj = new BehaviorSubject({});
    if (ref && callback) {
        ref.off('value', callback);
    }

    ref = getEventRef(eventId);
    callback = ref.on('value', (resp) => {
        const theEvent = (resp as any).val();
        const guestArray = objectValuesToArray(theEvent.guests);
        Observable
            .from(guestArray)
            .flatMap(expandUser)
            .take(guestArray.length)
            .reduce((list, guest) => addGuestToList(list as any[], guest), [])
            .subscribe( (users) => {
                const completeEvent = {...theEvent, guests: users}
                subj.next(completeEvent);
            })
    });
    return subj.asObservable();
}

export function addLoggedUserToEvent(eventId) {
    const subj = new Subject();
    const user = getCurrentUser() || {uid: 'bolza'};
    const guests = getEventRef(eventId).child('guests');
    guests.push(user.uid)
        .then(res => {
            subj.next();
            subj.complete();
        })
        .catch(err => {
            console.log('error', err)
        });

    return subj.asObservable();
}

function addGuestToList(guestlist: any[], rawuser: any): User[] {
    const key = rawuser.key;
    const refineduser = rawuser.val();
    refineduser.gid = refineduser.id;
    refineduser.id = refineduser.uid = key;
    return [...guestlist, refineduser];
}

function expandUser(guestId) {
    const userRef = getUserRef(guestId);
    return Observable.fromEvent(userRef, 'value');
}