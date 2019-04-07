import { toast } from 'react-toastify';
export const fetchUserDetail = (id) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
        const endpoint = `/api/user/${id}/` 
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
                    toast.error("Server Error...")
                    console.log("Server Error!");
                    throw res;
                }
            })

            .then(res => {
                if (res.status === 200) {
                    return dispatch({type: 'FETCH_USER_DETAIL', userdetail: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    toast.error("Authentication Error...")
                    dispatch({type: "AUTHENTICATION_ERROR", userdetail: res.data});
                    throw res.data;
                } 
                else if (res.status === 404) {
                    toast.error("User is not found...")
                    dispatch({type: "USER_NOT_FOUND"});
                } else {
                    throw res.data
                }
            })
            .catch(error => {                
                //error.redirect('/404');
                //Handle error
                console.log("error", error);
                // return dispatch({type: "MESSAGE_NOT_FOUND", detail: error});
                // dispatch({type: "MESSAGE_NOT_FOUND", detail: error});
            });
    }
}
