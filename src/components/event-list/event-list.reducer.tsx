import {sortBy, filter, find} from 'lodash';

import * as actions from './event-list.actions';
import { getCurrentUser } from '../../database';
import { EventCreationState } from '../../types';
import firebase from 'firebase';

export const INITIAL_STATE = {
    list: []
};

export default (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case actions.EVENT_LIST_UPDATE_ACTION_TYPE:
            const currentUser = getCurrentUser();
            const isOwned = currentUser && currentUser.uid === action.payload.owner;
            if (isOwned) return { ...state, eventOwned: action.payload };

            let temp = [...state.list];
            const eventAlreadyExists = !!find(temp, {id: action.payload.id});
            const eventObj = {...action.payload};
            if (eventAlreadyExists) {
                temp = updateList(temp, eventObj);
            } else {
                temp.push(eventObj);
            }

            temp = sortEvents(temp);

            return {
                ...state,
                list: [...temp],
            };
        case actions.EVENT_LIST_REMOVE_ACTION_TYPE:
            return {
                ...state,
                list: filter(state.list, (item) => item.id !== action.payload.id)
            };
        default:
            return state;
    }
};

function updateList(tList, item) {
    return tList.map(obj => {
        if (obj.id === item.id) return item;
        return obj;
    });
}

function sortEvents(tList) {
    tList = sortBy(tList, ['distance']);
    return tList;
}