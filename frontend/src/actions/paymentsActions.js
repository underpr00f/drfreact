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
