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

function loadPreviousData() {
    let chatArea = document.getElementById("chatArea");
    
    let getcurrentUserId = localStorage.getItem("currentUserId");
    let currentUserId = JSON.parse(getcurrentUserId)
    
    let getclickedUserId = localStorage.getItem("clickedUserId");
    let clickedUserId = JSON.parse(getclickedUserId)

    let database = firebase.database().ref(`chats/friends/${currentUserId}/${clickedUserId}/messages/`)    
        database.once('value', (snapshot) => {
            var message = snapshot.val();
            if (message.senderReceriver === "sender") {
                console.log(message.text, message.name);
            } else {
                console.log(message.text, message.name);
            }
        })

        //getting ready for next step
        //getting names of 2 user's
        //display name on top
        firebase.database().ref(`users/${currentUserId}`)
            .once('value', (snapshot) =>{
                let currentUserName = snapshot.val().name;
                console.log(currentUserName)
            })
        firebase.database().ref(`users/${clickedUserId}`)
            .once('value', (snapshot) =>{
                let clickedUserName = snapshot.val().name;
                let topName = document.getElementById("topName");
                topName.innerHTML = clickedUserName;
                console.log(clickedUserName)
            })
}

function sendMessage() {
    let getcurrentUserId = localStorage.getItem("currentUserId");
    let currentUserId = JSON.parse(getcurrentUserId)
    
    let getclickedUserId = localStorage.getItem("clickedUserId");
    let clickedUserId = JSON.parse(getclickedUserId)
    


}