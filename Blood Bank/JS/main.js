window.addEventListener('load', async () => {
  await uidCheck();

})

function uidCheck() {

  let get = localStorage.getItem("userAuth");
  let data = JSON.parse(get);
  console.log(data)
  if (data.user === "null") {
    let body = document.getElementById("body");
    // logout.style.visibility = "visible";
    body.innerHTML = `<h1>You don't have permission to access this page</h1>`;
  }
}


acceptorDonorCheck();

// Get a reference to the database service
var database = firebase.database();
var ref = database.ref('users');
ref.once('value', gotData, errData)

function gotData(data) {
  // console.log(data.val())
  var users = data.val();
  var keys = Object.keys(users);
  console.log(keys, "keys")
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]
    // console.log(users[],"users")
    var fName = users[k].fName;
    var lName = users[k].lName;
    var bloodGroup = users[k].bloodGroup;
    var age = users[k].age;
    var email = users[k].email;
    var sex = users[k].sex;
    var phoneNumber = users[k].phoneNumber;
    var status = users[k].donorAcceptor;
    console.log(fName, lName, bloodGroup, age, sex)
    if (status === "donor") {
      var table = document.getElementById("tbody-donor");
      table.innerHTML += `<tr><td>${fName}</td><td>${lName}</td><td>${sex}</td><td>${age}</td><td>${email}</td><td>${phoneNumber}</td><td>${bloodGroup}</td></tr>`;
      // document.getElementById("acceptor").style.visibility = "hidden";
    } else {
      var table = document.getElementById("tbody-acceptor");
      // let donorButton = document.getElementById("donor").style.visibility = "hidden";
      table.innerHTML += `<tr><td>${fName}</td><td>${lName}</td><td>${sex}</td><td>${age}</td><td>${email}</td><td>${phoneNumber}</td><td>${bloodGroup}</td></tr>`;
    }
  }
}

function errData(err) {
  console.log("err")
}


let logout = document.getElementById("logout");
logout.addEventListener('click', () => {
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
})

function acceptorDonorCheck() {
  let uid = firebase.auth().currentUser.uid;
  var database = firebase.database();
  var ref = database.ref(`users/${uid}/donorAcceptor`);
  ref.once('value', (datasnapshot) => {
    console.log(datasnapshot);
  })
}

// acceptorDonorCheck();

let becameAcceptor = document.getElementById("acceptor");
becameAcceptor.addEventListener('click', () => {
  let data = {
    donorAcceptor: "donor"
  }
  let uid = firebase.auth().currentUser.uid;
  let fb = firebase.database().ref('users/' + uid).update(data);


  location.reload();
})

