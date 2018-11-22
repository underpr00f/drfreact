export const fetchDetailNote = (id) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
        const endpoint = `/api/messages/${id}/` 
        // console.log(nextEndpoint)
        // if (nextEndpoint !== undefined && nextEndpoint !== null) {
        //   endpoint = nextEndpoint
        // }
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        
        return fetch(endpoint, {headers, })
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            // getState().notes[0].concat(res.data)}
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    return dispatch({type: 'FETCH_DETAIL_NOTE', detail: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}

