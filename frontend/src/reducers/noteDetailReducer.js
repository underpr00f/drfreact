export default function noteDetailReducer(state = {loading: true, updated: false, hasError: false, errors: {}}, action) {
    switch(action.type) {

        case 'FETCH_DETAIL_NOTE':
            return { ...state, ...action.detail, loading: false, hasError: false, errors: {}};
        case 'UPDATE_DETAIL_NOTE':
            return { ...state, ...action.detail, loading: false, updated: true, hasError: false, errors: {}};
        case 'ADD_DETAIL_NOTE':
            return { ...state, ...action.detail, loading: false, hasError: false, errors: {}};

        case 'MESSAGE_NOT_FOUND':
            return {...state, 
                hasError: true,
                errors: {page: "Investor not found"},
                loading: false,
            };

        default:
          // will NOT execute because of the line preceding the switch.
    }
    return state;
}