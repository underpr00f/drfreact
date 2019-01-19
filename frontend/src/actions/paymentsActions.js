export const fetchPaymentsLead = () => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
        const endpoint = `/api/payments/` 
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        
        return fetch(endpoint, {headers, })
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                // } else if (res.status === 404) {
                //     dispatch({type: "MESSAGE_NOT_FOUND", data: res.data});
                //     throw res.data;
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })

            .then(res => {
                if (res.status === 200) {
                    return dispatch({type: 'FETCH_PAYMENTS_LEAD', lead: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                } else if (res.status === 404) {
                    dispatch({type: "MESSAGE_NOT_FOUND", lead: res.data});
                    throw res.data;
                }
            })
    }
}

// export const updateDetailNote = (id, text, phone, status, is_corporate, email, linkedin_profile, website) => {
//     return (dispatch, getState) => {

//         let headers = {"Content-Type": "application/json"};
//         let {token} = getState().auth;

//         if (token) {
//             headers["Authorization"] = `Token ${token}`;
//         }

//         let body = JSON.stringify({text, phone, status, is_corporate, email, linkedin_profile, website });
//         let noteId = id;

//         return fetch(`/api/messages/${noteId}/`, {headers, method: "PUT", body})
//             .then(res => {
//                 if (res.status < 500) {
//                     return res.json().then(data => {
//                         return {status: res.status, data};
//                     })
//                 } else {
//                     console.log("Server Error!");
//                     throw res;
//                 }
//             })
//             .then(res => {
//                 if (res.status === 200) {
//                     return dispatch({type: 'UPDATE_DETAIL_NOTE', detail: res.data, id});
//                 } else if (res.status === 401 || res.status === 403) {
//                     dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
//                     throw res.data;
//                 }
//             })
//     }
// }

// export const addDetailNote = (text, phone, status, is_corporate, email, linkedin_profile, website) => {
//     return (dispatch, getState) => {
//         let headers = {"Content-Type": "application/json"};
//         let {token} = getState().auth;

//         if (token) {
//             headers["Authorization"] = `Token ${token}`;
//         }

//         let body = JSON.stringify({text, phone, status, is_corporate, email, linkedin_profile, website });
//         return fetch("/api/messages/", {headers, method: "POST", body})
//             .then(res => {
//                 if (res.status < 500) {
//                     return res.json().then(data => {
//                         return {status: res.status, data};
//                     })
//                 } else {
//                     console.log("Server Error!");
//                     throw res;
//                 }
//             })
//             .then(res => {
//                 if (res.status === 201) {
//                     return dispatch({type: 'ADD_DETAIL_NOTE', detail: res.data});
//                 } else if (res.status === 401 || res.status === 403) {
//                     dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
//                     throw res.data;
//                 }
//             })
//     }
// }