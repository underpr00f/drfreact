export default function userDetailReducer(state = {loading: true}, action) {
    switch(action.type) {

        case 'FETCH_USER_DETAIL':
            return { ...state, 
                ...action.userdetail, 
                hasError: false,
                errors: {},
                loading: false,
            };
        // case 'UPDATE_DETAIL_NOTE':
        //     return { ...state, ...action.detail, loading: false, updated: true};
        // case 'ADD_DETAIL_NOTE':
        //     return { ...state, ...action.detail, loading: false};

        case 'USER_NOT_FOUND':
            return {...state, 
                hasError: true,
                errors: {page: "User not found"},
                loading: false,
            };

        default:
          // will NOT execute because of the line preceding the switch.
    }
    return state;
}