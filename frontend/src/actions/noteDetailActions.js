import { toast } from 'react-toastify';
export const fetchDetailNote = (id) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
        const endpoint = `/api/investors/${id}/` 
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
                    return dispatch({type: 'FETCH_DETAIL_NOTE', detail: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    toast.error("Authentication Error...")
                    dispatch({type: "AUTHENTICATION_ERROR", detail: res.data});
                    throw res.data;
                } 
                else if (res.status === 404) {
                    toast.error("Investor is not found...")
                    dispatch({type: "MESSAGE_NOT_FOUND"});

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

export const updateDetailNote = (id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence, last_call, documents, attached) => {
    return (dispatch, getState) => {

        let headers = {'Accept': 'application/json'};
        // let headers = {"Content-Type": "multipart/form-data"};

        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        let formData = new FormData();
        formData.append('text', text);
        formData.append('phone', phone);
        formData.append('status', status);
        formData.append('is_corporate', is_corporate);
        formData.append('is_payed', is_payed);
        formData.append('email', email);
        formData.append('linkedin_profile', linkedin_profile);
        formData.append('website', website);
        // Not required fields
        if (correspondence) {
            formData.append('correspondence', correspondence);
        }
        //check if attached & if documents(file) is not string
        //if documents is string don't append formData
        if (attached && 
          !(typeof documents === 'string' || documents instanceof String)) {
            formData.append('documents', documents);
        }

        // formData need to convert ISO format string
        if (last_call){
            if (String(last_call) !=="Invalid Date") {
                formData.append('last_call', last_call.toISOString());
            }            
        } else {
            formData.append('last_call', "");
        }
        let noteId = id;
        return fetch(`/api/investors/${noteId}/`, {headers, method: "PUT", body: formData})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    toast.error("Server error...")
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    toast.info("Investor "+res.data.text+" edited")
                    return dispatch({type: 'UPDATE_DETAIL_NOTE', detail: res.data, id});
                } else if (res.status === 401 || res.status === 403) {
                    toast.error("Authentication Error...")
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}

export const addDetailNote = (text, phone, status, is_corporate, email, linkedin_profile, website, correspondence) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        let body = JSON.stringify({text, phone, status, is_corporate, email, linkedin_profile, website, correspondence });
        return fetch("/api/investors/", {headers, method: "POST", body})
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
            .then(res => {
                if (res.status === 201) {
                    toast.info("Investor "+res.data.text+" added")
                    return dispatch({type: 'ADD_DETAIL_NOTE', detail: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}
