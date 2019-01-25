window.addEventListener('load', async () => {
    await uidCheck();
    acceptorDonorCheck()
    getNameAndStatus()
    getAllUsers()

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
    // var uid = data.user.uid;
    // var database = firebase.database();

    // //Refrence to Node Donor Acceptor
    // //checking wheather the value is acceptor or donor
    // //if donor seeting donor button hidden vice-versa
    // var refdA = database.ref(`users/${uid}/donorAcceptor`);
    // refdA.once('value', (datasnapshot) => {
    //     dA = datasnapshot.val();
    //     console.log(dA);
    //     if (dA === "acceptor") {
    //         document.getElementById("status-sidebar").innerHTML = "Status: Acceptor";
    //         document.getElementById("donor").style.visibility = "";
    //         document.getElementById("acceptor").style.visibility = "hidden";
    //     } else {
    //         document.getElementById("status-sidebar").innerHTML = "Status: Donor";
    //         document.getElementById("acceptor").style.visibility = "";
    //         document.getElementById("donor").style.visibility = "hidden";
    //     }
    // })

    //     var ref_FName = database.ref(`users/${uid}/fName`);
    //     ref_FName.once('value', (datasnapshot) => {
    //         document.getElementById("name").innerHTML = datasnapshot.val();
    //     })
    //     var ref_LName = database.ref(`users/${uid}/lName`);
    //     ref_LName.once('value', (datasnapshot) => {
    //         document.getElementById("name").innerHTML += " " + datasnapshot.val();
    //     })

     }

    async function acceptorDonorCheck() {
        let get = localStorage.getItem("userAuth");
        let datalocal = JSON.parse(get);
        let uid = datalocal.user.uid;

        if (uid) {
            let database = firebase.database();
            //Refrence to Node Donor Acceptor
            //checking wheather the value is acceptor or donor
            //if donor hide donor button hidden vice-versa
            let refdA = database.ref(`users/${uid}/donorAcceptor`);
            refdA.once('value', (datasnapshot) => {
                dA = datasnapshot.val();
                console.log(dA);
                if (dA === "acceptor") {
                    document.getElementById("status-sidebar").innerHTML = "Status: Acceptor";
                    document.getElementById("donor").style.visibility = "";
                    document.getElementById("acceptor").style.visibility = "hidden";
                } else {
                    document.getElementById("status-sidebar").innerHTML = "Status: Donor";
                    document.getElementById("acceptor").style.visibility = "";
                    document.getElementById("donor").style.visibility = "hidden";
                }
            })

        }
    }

    function getNameAndStatus() {

        let get = localStorage.getItem("userAuth");
        let datalocal = JSON.parse(get);
        let uid = datalocal.user.uid;

        let database = firebase.database();
        let ref_FName = database.ref(`users/${uid}/fName`);
        ref_FName.once('value', (datasnapshot) => {
            document.getElementById("name").innerHTML = datasnapshot.val();
        })
        let ref_LName = database.ref(`users/${uid}/lName`);
        ref_LName.once('value', (datasnapshot) => {
            document.getElementById("name").innerHTML += " " + datasnapshot.val();
        })

        profile_Image = database.ref(`users/${uid}/profile`);
        profile_Image.once('value', (datasnapshot) => {
            if(datasnapshot.val()){
                document.getElementById("image").src = datasnapshot.val();
            }
        })

    }

function getAllUsers() {
    firebase.database().ref("users")
        .once("value", (data) => {
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
        })
}

let becameAcceptor = document.getElementById("acceptor");
becameAcceptor.addEventListener('click', () => {
    let get = localStorage.getItem("userAuth");
    let datalocal = JSON.parse(get);
    let uid = datalocal.user.uid;
    let data = {
        donorAcceptor: "acceptor"
    }
    // let uid = firebase.auth().currentUser.uid;
    let fb = firebase.database().ref('users/' + uid).update(data);
    location.reload();
})

let becamedonor = document.getElementById("donor");
becamedonor.addEventListener('click', () => {
    let get = localStorage.getItem("userAuth");
    let datalocal = JSON.parse(get);
    let uid = datalocal.user.uid;
    console.log(uid)
    let data = {
        donorAcceptor: "donor"
    }
    // let uid = firebase.auth().currentUser.uid;
    let fb = firebase.database().ref('users/' + uid).update(data);
    location.reload();
})

let about = document.getElementById("about");
about.addEventListener('click', () => {
    swal("About", "The project Web and Mobile Web Blood Bank system is developed so that users can view the information about registered blood donors such as name, address, and other such personal information along with their details of blood group and other medical information of donor.The project also has a login page where in the user is required to register and only then can view the availability of blood and may also register to donate blood if he / she wishes to.This project requires internet access and thus there is a disadvantage of internet failure.Thus this application helps to select the right donor online instantly using medical details along with the blood group.The main aim of developing this application is to reduce the time to a great extent that is spent in searching for the right donor and the availability of blood required.Thus this application provides the required information in no time and also helps in quicker decision making. ");
})

let help = document.getElementById("help");
help.addEventListener("click", () => {
    swal("Blood Donation chart", "Group O - It can donate red blood cell to anybody, it is universal\nGroup A - It can donate red blood cells to A's and AB's\nGroup B - It can Donate red blood cells to B's and AB's\nGroup AB - It can donate to other AB's, but can receive from all others ");
})

function logout() {
    firebase.auth().signOut()
        .then(() => {
            localStorage.setItem("userAuth", JSON.stringify({
                user: "null"
            }));
            location.assign("../pages/signin.html");
            //signout Succesful
        }).catch((error) => {
            alert(error)
        })
}

//Service worker test
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('../service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }