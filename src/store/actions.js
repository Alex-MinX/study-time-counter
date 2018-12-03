import * as firebase from 'firebase';

export default {
    signUserUp ({commit}, payload) {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(
                /*
                user => {
                    const newUser = {
                        id: user.uid
                    }
                    commit('setUser', newUser);
                }*/
                alert('you are successfully signed up! Please login now')
            )
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
    userStateObserver (context, payload) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log("userinfo: ", user);
                const newUser = {
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    isAnonymous: user.isAnonymous,
                    uid: user.uid,
                    providerData: user.providerData
                }
                context.commit('setUser', newUser);
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });
    }
}