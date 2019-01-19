export default function paymentsReducer(state = {}, action) {
    switch(action.type) {
        case 'FETCH_PAYMENTS_LEAD':
            return [ ...state, ...action.lead];
        // case 'UPDATE_DETAIL_NOTE':
        //     return { ...state, ...action.detail};
        // case 'ADD_DETAIL_NOTE':
        //     return { ...state, ...action.detail};
        case 'MESSAGE_NOT_FOUND':
            return [ ...state, ...action.lead];
        default:
          // will NOT execute because of the line preceding the switch.
    }
    return state;
}