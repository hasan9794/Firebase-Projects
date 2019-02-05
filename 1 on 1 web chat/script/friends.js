var config = {
    apiKey: "AIzaSyAjzgpWsk5ZRHmS9XWTseAfL071o7iUKdE",
    authDomain: "bikeshopsample-38061.firebaseapp.com",
    databaseURL: "https://bikeshopsample-38061.firebaseio.com",
    projectId: "bikeshopsample-38061",
    storageBucket: "bikeshopsample-38061.appspot.com",
    messagingSenderId: "146277578999"
};
firebase.initializeApp(config);

window.addEventListener('load', async () => {
    await authCheck()
    friendRequest()
})

async function authCheck() {
    let get = await localStorage.getItem("userAuth");
    let data = JSON.parse(get)
    console.log(data)
    if (data.user === "null") {
        document.getElementById("body").innerHTML =
            `<h1>You don't have permission to access this page. 
        Please Login to continue</h1>`
        return false;
    }
}

function friendRequest() {
    let requestContainer = document.getElementById("requestContainer")
    let get = localStorage.getItem("userAuth");
    let data = JSON.parse(get)
    let currentUserId = data.user.uid;
    let database = firebase.database().ref(`chats/pendingRequests/${currentUserId}`)
    database.once('value', (snapshot) => {
        let requestObj = Object.keys(snapshot.val());
        requestObj.map(requestUid => {
            let usersObj = firebase.database().ref(`/users/${requestUid}`)
                .once('value', (snapshot) => {
                    let user = snapshot.val();
                    requestContainer.innerHTML += `<h1>${user.name}<button>Accept</button></h1>`
                })
        })
    })
}

function logOut() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.setItem("userAuth", JSON.stringify({
                user: "null"
            }))

            window.location = "../pages/signIn.html"
            // Sign-out successful.
        }).catch((error) => {
            let message = error.message;
            console.log(message)
            // An error happened.
        });
}