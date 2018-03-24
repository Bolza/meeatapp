import * as actions from './event-creation.actions';
import { EventCreationState } from '../../types';
import moment from 'moment';

const DEFAULT_DATE = moment().format('LT');
const DEFAULT_PEOPLE = 5;

export const INITIAL_STATE: EventCreationState = {
    slots: DEFAULT_PEOPLE,
    date: DEFAULT_DATE,
    location: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null,
    },
    details: {}
};

export default (state = INITIAL_STATE, action): EventCreationState => {
    switch (action.type) {
        case actions.EVENT_CREATION_SET_LOCATION_ACTION_TYPE:
            return {
                ...state,
                location: {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                },
                details: {
                    ...action.payload
                },
            };
        case actions.EVENT_CREATION_SET_DATE_ACTION_TYPE:
            return {
                ...state,
                date: action.payload,
            };
        case actions.EVENT_CREATION_SET_SLOTS_ACTION_TYPE:
            return {
                ...state,
                slots: action.payload,
            };
        default:
            return state;
    }
};
