let ROOT_URL = "http://localhost:8000/";

console.log('public url: ', process.env)

if (process.env !== "development") {
	ROOT_URL = ""
}
export const AuthUrls = {
    LOGIN: `${ROOT_URL}rest-auth/login/`,
    SIGNUP: `${ROOT_URL}rest-auth/registration/`,
    CHANGE_PASSWORD: `${ROOT_URL}rest-auth/password/change/`,
    RESET_PASSWORD: `${ROOT_URL}rest-auth/password/reset/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}rest-auth/password/reset/confirm/`,
    USER_ACTIVATION: `${ROOT_URL}rest-auth/registration/verify-email/`,
    USER_PROFILE: `${ROOT_URL}rest-auth/user/`
};