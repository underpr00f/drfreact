export const fetchNotes = (nextEndpoint) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
        let endpoint = '/api/investors/' 
        // console.log(nextEndpoint)
        if (nextEndpoint !== undefined && nextEndpoint !== null) {
          endpoint = nextEndpoint
        }
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        let {notes} = getState();
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
                    return dispatch({type: 'FETCH_NOTES', notes: notes.push(res.data)});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}
export const searchNotes = (searchtext) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
        let endpoint = '/api/investors/' 
        if (searchtext !== undefined && searchtext !== null) {
          endpoint = `/api/investors/?search=${searchtext}`
        }
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        return fetch(endpoint, {headers, method: "GET", })
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        // console.log(res)
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })

            .then(res => {
                if (res.status === 200) {
                    return dispatch({type: 'SEARCH_NOTES', notes: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}
export const orderNotes = (order) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
        let endpoint = '/api/investors/' 
        if (order !== undefined && order !== null) {
          endpoint = `/api/investors/?ordering=${order}`
        }
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        return fetch(endpoint, {headers, method: "GET", })
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        // console.log(res)
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })

            .then(res => {
                if (res.status === 200) {
                    return dispatch({type: 'ORDER_NOTES', notes: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}
export const addNote = (text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        let body = JSON.stringify({text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence });
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
                    return dispatch({type: 'ADD_NOTE', note: res.data});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}

export const updateNote = (index, id, text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence) => {
    return (dispatch, getState) => {

        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        let body = JSON.stringify({text, phone, status, is_corporate, is_payed, email, linkedin_profile, website, correspondence });
        console.log("id", id, "index", index)
        let noteId = getState().notes[index].noteitems[id].id;

        return fetch(`/api/investors/${noteId}/`, {headers, method: "PUT", body})
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
                if (res.status === 200) {
                    return dispatch({type: 'UPDATE_NOTE', note: res.data, index, id});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}

export const deleteNote = (id, index) => {
    return (dispatch, getState) => {

        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
        let noteId = getState().notes[id].noteitems[index].id;

        return fetch(`/api/investors/${noteId}/`, {headers, method: "DELETE"})
            .then(res => {
                if (res.status === 204) {
                    return {status: res.status, data: {}};
                } else if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 204) {
                    return dispatch({type: 'DELETE_NOTE', id, index});
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                    throw res.data;
                }
            })
    }
}
