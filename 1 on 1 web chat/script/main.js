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
        userList.innerHTML += `<h4>${usersobject[key].name}</h4>`

      })
    })
  })