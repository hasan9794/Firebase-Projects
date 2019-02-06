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
  getAllUsers()
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


function getAllUsers() {
  let userList = document.getElementById("userList");
  let database = firebase.database().ref('/users');
  database.once('value', (snapshot) => {
    let usersobject = snapshot.val();
    userId = Object.keys(usersobject);
    let currentUserId = firebase.auth().currentUser.uid;
    userId.map(key => {
      console.log(usersobject[key].name)
      if (key !== currentUserId) {
        userList.innerHTML += `<h4>${usersobject[key].name}<button onClick="startChat('${key}')" >Start Chat</button></h4> `
      }

    })
  })
}

function startChat(clickedUserId){
  let currentUserId = firebase.auth().currentUser.uid;
  console.log(clickedUserId)
  localStorage.setItem("clickedUserId", JSON.stringify(clickedUserId))
  localStorage.setItem("currentUserId", JSON.stringify(currentUserId))
  location.assign('../pages/chat.html')        
}

// function sendFriendRequest(key, button) {
//   console.log(key);
//   let currentUserId = firebase.auth().currentUser.uid;
//   firebase.database().ref(`chats/pendingRequests/${currentUserId}/${key}`).set({
//     status: "sender"
//   })
//   firebase.database().ref(`chats/pendingRequests/${key}/${currentUserId}`).set({
//     status: "receiver"
//   })

//   button.innerHTML = "request sent"
// }

// function checkSentReq() {
//   let currentUserId = firebase.auth().currentUser.uid;
//   let database = firebase.database().ref(`chats/pendingRequests/${currentUserId}/`);
//   database.once('value', (snapshot) => {
//     valuea = snapshot.val()
//   })
// }

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