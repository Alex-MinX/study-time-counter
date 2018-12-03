import * as firebase from 'firebase';

export default {
    signUserUp (context, payload) {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(function() {
                /*
                user => {
                    const newUser = {
                        id: user.uid
                    }
                    commit('setUser', newUser);
                }*/
                context.commit('loginVis');
                alert('you are successfully signed up!')
            })
            .catch(function(error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    },
    login (context, payload) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .catch(function(error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    },
    logout (context, payload) {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            context.commit('setUser', null);
            alert('Sign-out successful');
        }).catch(function(error) {
            // An error happened.
            alert('An error happened, please try logout again');
        });
    },
    userStateObserver ({commit, dispatch}, payload) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // if user is already logged in, directly show the main window
                commit('mainVis');

                // User is signed in.
                const newUser = {
                    email: user.email,
                    uid: user.uid,
                }
                commit('setUser', newUser);

                dispatch('refDataFromFB');
                // ...
            } else {
                // User is signed out.
                // if user not logged in or user click the log out, show the login window
                commit('loginVis');
            }
        });
    },
    addDataToFB (context, payload) {
        let userId = context.state.user.uid;
        firebase.database().ref('users/' + userId + '/' + payload.date).set(payload, function(error) {
            if(error) {
                // The write failed...
                console.log("The write failed...")
            } else {
                // Data saved successfully!
                console.log("Data saved successfully!")
            }
        });
    },
    refDataFromFB ({commit, state}) {
        let userId = state.user.uid;
        firebase.database().ref('users/' + userId).on('value', function(data) {
            let dataObj = data.val();
            commit('setDataFromFB', dataObj);
        });
    }
}