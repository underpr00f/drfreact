export default function paymentsReducer(state = {leads: "", loading: true, loaded: false}, action) {
    switch(action.type) {
        case 'FETCH_PAYMENTS_LEAD':
            return { ...state, leads: [...action.leads], loading: false, loaded: true }
        case 'LEAD_NOT_FOUND':
            return {...state, loading: false, error: "Not found"};
        default:
          // will NOT execute because of the line preceding the switch.
    }
    return state;
}