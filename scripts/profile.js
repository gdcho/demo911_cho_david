var currentUser;          //put this right after you start script tag before writing any functions.

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSchool = userDoc.data().school;
                    var userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }

function saveUserInfo() {
    // Get the new value typed by the user in each field of the form
    const userName = document.getElementById('nameInput').value;
    const userSchool = document.getElementById('schoolInput').value;
    const userCity = document.getElementById('cityInput').value;
  
    // Update the user's data using the "currentUser" document
    currentUser.update({
      name: userName,
      school: userSchool,
      city: userCity
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
  
    // Make the form disabled after the "Save" button is clicked
    document.getElementById('personalInfoFields').disabled = true;
  }
  