/* eslint-disable max-len */
import { EMAIL_CHANGED_ACTION, PASSWORD_CHANGED_ACTION, LOGIN_SUCCESS_ACTION, LOGIN_FAIL_ACTION, LOGIN_ATTEMPT_ACTION } from './login.actions';
import { AuthState } from '../../types';
/* eslint-enable max-len */

const INITIAL_STATE: AuthState = {
    email: '',
    password: '',
    user: null,
    error: null,
};

export default (state = INITIAL_STATE, action): AuthState => {
    switch (action.type) {
        case EMAIL_CHANGED_ACTION:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED_ACTION:
            return { ...state, password: action.payload };
        case LOGIN_ATTEMPT_ACTION:
            return { ...state, error: null };
        case LOGIN_SUCCESS_ACTION:
            return { ...state, user: action.payload };
        case LOGIN_FAIL_ACTION:
            return { ...state, error: LOGIN_FAIL_ACTION };
        default:
            return state;
    }
};
