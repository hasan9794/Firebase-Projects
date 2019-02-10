var config = {
    apiKey: "AIzaSyAjzgpWsk5ZRHmS9XWTseAfL071o7iUKdE",
    authDomain: "bikeshopsample-38061.firebaseapp.com",
    databaseURL: "https://bikeshopsample-38061.firebaseio.com",
    projectId: "bikeshopsample-38061",
    storageBucket: "bikeshopsample-38061.appspot.com",
    messagingSenderId: "146277578999"
  };
  firebase.initializeApp(config);

  let signUp = document.getElementById('register');
  signUp.addEventListener('click', () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let userObj = {
        name,
        email
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() =>{
        let uid = firebase.auth().currentUser.uid;
        console.log(uid)
        firebase.database().ref('users/' + uid).set(userObj);
        alert("Signup Successful");
        location.assign('../pages/signin.html')
    })
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
      
  })