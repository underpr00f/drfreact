import { AuthTypes } from "../constants/actionTypes";

export default function(state = {loading: true}, action) {
    switch(action.type) {
        case AuthTypes.LOGIN:
            return { ...state, authenticated: true, token: action.payload};
        case AuthTypes.LOGOUT:
            return { ...state, authenticated: false, token: null};
        case AuthTypes.USER_PROFILE:
            return { ...state, user: action.payload, loading: false};
        // case AuthTypes.WITH_ERROR:
        //     return { ...state, error: action.payload};
        default:
        	// will NOT execute because of the line preceding the switch.
    }
    return state;
}