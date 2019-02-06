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
    loadPreviousData()

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

async function loadPreviousData() {
    let chatArea = document.getElementById("chatArea");

    let getcurrentUserId = localStorage.getItem("currentUserId");
    let currentUserId = JSON.parse(getcurrentUserId)

    let getclickedUserId = localStorage.getItem("clickedUserId");
    let clickedUserId = JSON.parse(getclickedUserId)

    let database = firebase.database().ref(`chats/friends/${currentUserId}/${clickedUserId}/messages/`)
    database.on('value', (snapshot) => {
        let messageObj = snapshot.val();
        let messageKeys = Object.keys(messageObj);
        console.log(messageKeys)
        chatArea.innerHTML = "";
        messageKeys.map(key => {
            if (messageObj[key].senderReceiver === "sender") {
                chatArea.innerHTML +=
                `<li class="self">
                    <div class="msg">
                    <h5 style="margin:0; padding: 0;">${messageObj[key].name}</h5>
                    <p></p>
                    <p>${messageObj[key].text}</p>
                        <time>20:17</time>
                    </div>
                </li>`;
                // console.log(messageObj[key].text, messageObj[key].name);
            } else {
                chatArea.innerHTML +=
                    `<li class="other">
                        <div class="msg">
                        <h5 style="margin:0; padding: 0;">${messageObj[key].name}</h5>
                        <p>${messageObj[key].text}</p>
                        <time>20:18</time>
                        </div>
                    </li>`
                // console.log(messageObj[key].text, messageObj[key].name);
            }

        })

        // firebase.database().ref(`chats/friends/${currentUserId}/${clickedUserId}/messages/`)
        // .orderByKey().limitToLast(1).on('value', (snapshot) =>{
        //     console.log(snapshot.val())
        // })
    })


    //getting ready for next step
    //getting names of 2 user's
    //display name on top
    firebase.database().ref(`users/${currentUserId}`)
        .once('value', (snapshot) => {
            let currentUserName = snapshot.val().name;
            localStorage.setItem("currentUserName", JSON.stringify(currentUserName))
            console.log(currentUserName)
        })
    firebase.database().ref(`users/${clickedUserId}`)
        .once('value', (snapshot) => {
            let clickedUserName = snapshot.val().name;
            localStorage.setItem("clickedUserName", JSON.stringify(clickedUserName))
            let topName = document.getElementById("topName");
            topName.innerHTML = clickedUserName;
            console.log(clickedUserName)
        })
}


let sendBtn = document.getElementById('sendBtn')
sendBtn.addEventListener('click', () => {
    let messageText = document.getElementById("text").value;
    let database = firebase.database()

    let getcurrentUserId = localStorage.getItem("currentUserId");
    let currentUserId = JSON.parse(getcurrentUserId);
    let getcurrentUserName = localStorage.getItem("currentUserName");
    let currentUserName = JSON.parse(getcurrentUserName);

    let getclickedUserId = localStorage.getItem("clickedUserId");
    let clickedUserId = JSON.parse(getclickedUserId)
    
    database.ref(`chats/friends/${currentUserId}/${clickedUserId}/messages/`)
        .push({
            text: messageText,
            senderReceiver: "sender",
            name: currentUserName
        })


    database.ref(`chats/friends/${clickedUserId}/${currentUserId}/messages/`)
        .push({
            text: messageText,
            senderReceiver: "receiver",
            name: currentUserName
        })
})


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