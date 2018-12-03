export default {
    setUser(state, payload) {
        state.user = payload
    },
    signupVis(state, payload) {
        state.visControl.signup = true;
        state.visControl.login = false;
        state.visControl.main = false;
    },
    loginVis(state, payload) {
        state.visControl.login = true;
        state.visControl.signup = false;
        state.visControl.main = false;
    },
    mainVis(state, payload) {
        state.visControl.login = false;
        state.visControl.signup = false;
        state.visControl.main = true;
    },
    setDataFromFB(state, data) {
        state.dataFromFB = data;
    }
}