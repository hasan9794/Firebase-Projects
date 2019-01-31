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
    userId.map(key => {
      console.log(usersobject[key].name)
      userList.innerHTML += `<h4 onClick="readChat('${key}')">${usersobject[key].name}</h4>`

    })
  })
}

function readChat(clickedUserId) {
  let messageContainer = document.getElementById("displayMessage");
  messageContainer.innerHTML = "";
  localStorage.setItem("clickedUserId", JSON.stringify(clickedUserId));
  let currentUserId = firebase.auth().currentUser.uid;
  let database = firebase.database().ref('/messages').child(currentUserId + clickedUserId)
  database.once('value', (snapshot) => {
    let messageObject = snapshot.val();
    let messageKeys = Object.keys(messageObject);
    // console.log(key);
    messageKeys.map(key => {
      messageContainer.innerHTML += `<p>${messageObject[key].name}: ${messageObject[key].text}</p>`

    })
  })
  console.log(clickedUserId, "cliked");
  console.log(currentUserId, "current");
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