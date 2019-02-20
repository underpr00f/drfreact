export default function noteDetailReducer(state = {loading: true}, action) {
    switch(action.type) {

        case 'FETCH_DETAIL_NOTE':
            return { ...state, ...action.detail, loading: false};
        case 'UPDATE_DETAIL_NOTE':
            return { ...state, ...action.detail, loading: false};
        case 'ADD_DETAIL_NOTE':
            return { ...state, ...action.detail, loading: false};

        case 'MESSAGE_NOT_FOUND':
            return {...state, 
                hasError: true,
                errors: {page: "Page not found"},
                loading: false,
            };

        default:
          // will NOT execute because of the line preceding the switch.
    }
    return state;
}