export default function noteDetailReducer(state = {}, action) {
    switch(action.type) {
        case 'FETCH_DETAIL_NOTE':
            return { ...state, ...action.detail};
        default:
          // will NOT execute because of the line preceding the switch.
    }
    return state;
}