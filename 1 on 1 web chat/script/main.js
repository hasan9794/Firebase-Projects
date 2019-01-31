var config = {
    apiKey: "AIzaSyAjzgpWsk5ZRHmS9XWTseAfL071o7iUKdE",
    authDomain: "bikeshopsample-38061.firebaseapp.com",
    databaseURL: "https://bikeshopsample-38061.firebaseio.com",
    projectId: "bikeshopsample-38061",
    storageBucket: "bikeshopsample-38061.appspot.com",
    messagingSenderId: "146277578999"
  };
  firebase.initializeApp(config);

  window.addEventListener('load', () =>{
    let userList = document.getElementById("userList");
    let database = firebase.database().ref('/users');
    database.once('value', (snapshot) =>{
      let usersobject = snapshot.val();
      userId = Object.keys(usersobject);
      userId.map(key =>{
        console.log(usersobject[key].name)
        userList.innerHTML += `<h4 onClick="readChat('${key}')">${usersobject[key].name}</h4>`

      })
    })
  })

  function readChat(clickedUserId) {
    let messageContainer = document.getElementById("displayMessage");
    messageContainer.innerHTML = "";
    
    let currentUserId = firebase.auth().currentUser.uid;
    let database = firebase.database().ref('/messages').child(currentUserId + clickedUserId) 
      database.once('value', (snapshot) => {
          let messageObject = snapshot.val();
          let messageKeys = Object.keys(messageObject);
          // console.log(key);
          messageKeys.map(key =>{
            messageContainer.innerHTML += `<p>${messageObject[key].name}: ${messageObject[key].text}</p>`

          })
      })
    console.log(clickedUserId ,"cliked");
    console.log(currentUserId ,"current");
  }