let signUpBtn = document.getElementById("signup-btn");
signUpBtn.addEventListener('click', () => {
    let loader = document.getElementById("loader");
    loader.style.visibility = "";
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let age = document.getElementById("age").value;
    let fName = document.getElementById("f-name").value;
    let lName = document.getElementById("l-name").value;
    let phoneNumber = document.getElementById("phone").value;
    let bloodGroup = document.getElementById("blood-group").value;
    let donorAcceptor = document.getElementById("da-select").value;
    let sex = document.getElementById("sexMaleCheck").value;
    let file = document.getElementById("file").files[0];
    // let dpurl = getImgURL();

    if (!file) {
        alert("Please upload your profile picture")
        location.reload()
        // return false;
    }

    if (bloodGroup === "") {
        alert("Please select your blood group")
        location.reload()
        return false
    }
    if (document.getElementById("sexMaleCheck").checked) {} else {
        sex = "female";
    }


    console.log(sex);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((success) => {
            let userObj = {
                bloodGroup,
                email,
                fName,
                lName,
                password,
                sex,
                phoneNumber,
                age,
                donorAcceptor,

            }
            let uid = firebase.auth().currentUser.uid;
            console.log(uid, "uid");
            console.log(userObj);
            firebase.database().ref('users/' + uid).set(userObj)

            //Check if file is not uploaded
            // if (!file) {
            //     alert("Account create succesfully! You are being directed to Log In page");
            //     location.assign("../pages/signin.html")
            // }
            let storageRef = firebase.storage().ref().child(`profile/${file.name}`)
            storageRef.put(file)
                .then((url) => {
                    console.log(url)
                    url.ref.getDownloadURL()
                        .then((refUrl) => {
                            userObj.profile = refUrl;
                            console.log(userObj);
                            firebase.database().ref('users/' + uid).set(userObj)
                                .then(() => {
                                    alert("Account create succesfully! You are being directed to Log In page");
                                    location.assign("../pages/signin.html")
                                })
                        })
                })


        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            location.reload();
            // ...
        });
})