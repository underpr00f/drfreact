export default function noteDetailReducer(state = {}, action) {
    switch(action.type) {
        case 'FETCH_DETAIL_NOTE':
            return { ...state, ...action.detail};
        case 'UPDATE_DETAIL_NOTE':
            return { ...state, ...action.detail};
        case 'ADD_DETAIL_NOTE':
            return { ...state, ...action.detail};
        case 'MESSAGE_NOT_FOUND':
            return { ...state, ...action.detail};
        default:
          // will NOT execute because of the line preceding the switch.
    }
    return state;
}