let logInBtn = document.getElementById("login")
logInBtn.addEventListener('click', () => {
    let email = document.getElementById("email").value;
    let pw = document.getElementById("pw").value;
    let loader = document.getElementById("loader");
    loader.style.visibility = "";
    firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((success) =>{
        // alert("Welcome");
        localStorage.setItem("userAuth",JSON.stringify(success))
        location.assign("../pages/main.html")
    })
    
    .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage)
        location.reload();
        // ...
    });
})