var signupUser = document.getElementById("signupUser");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPass = document.getElementById("signinPassword");
var emailRegex = /^[\w-\.]+@([\w-]{2,}\.)+[\w-]{2,4}$/;
var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
var nameRegex = /^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/;
var userArr = [];

// Load existing users from local storage into userArr
if (localStorage.getItem("users") !== null) {
    userArr = JSON.parse(localStorage.getItem("users"));
}

var signupBtn = document.getElementById("signupBtn");
if(signupBtn){
    signupBtn.addEventListener("click", () => {
        // Basic validation checks
        if (!emailRegex.test(signupEmail.value.trim())) {
            alert("Invalid email address");
            return;
        }
    
        if (!passRegex.test(signupPassword.value.trim())) {
            alert("Invalid password. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.");
            return;
        }
    
        if (!nameRegex.test(signupUser.value.trim())) {
            alert("Invalid name format. It must contain at least 3 letters for each part of the full name.");
            return;
        }
        if (isEmailExist() == false){
            alert("wrong");
            return;
        }
        // If all validation passes, create the userObject
        var userObject = {
            userName: signupUser.value.trim(),
            userEmail: signupEmail.value.trim(),
            userPass: signupPassword.value.trim(),
        };
        alert("Signed up successfully")
        // Save the userObject in local storage and update userArr
        saveUserToLocalstorage(userObject);
        clearInputs();
    
        // Log userArr after local storage is updated
        console.log(userArr);
    });
}   

var signinBtn = document.getElementById("signinBtn");
if (signinBtn) {
    signinBtn.addEventListener("click", () => {
        // Basic validation checks for email and password
        if (!emailRegex.test(signinEmail.value.trim())) {
            alert("Invalid email address");
            return;
        }

        if (!passRegex.test(signinPass.value.trim())) {
            alert("Invalid password. It must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.");
            return;
        }

        // Check if the entered email and password match a user in userArr
        var authenticatedUser = authenticateUser(signinEmail.value.trim(), signinPass.value.trim());

        if (authenticatedUser) {
            // Save the authenticated user to local storage
            localStorage.setItem("authenticatedUser", JSON.stringify(authenticatedUser));

            // Redirect to home page after successful login
            window.location.href = "home.html";
        } else {
            alert("Invalid email or password");
        }
    });
}

var userHome = document.getElementById("userHome")
var authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser")) || {};
userHome.innerHTML = "Hello, " + authenticatedUser.userName;

function authenticateUser(email, password) {
    // Loop through userArr to find a user with matching email and password
    for (var i = 0; i < userArr.length; i++) {
        if (userArr[i].userEmail.toLowerCase() === email.toLowerCase() && userArr[i].userPass === password) {
            return userArr[i]; // Return the user object if a match is found
        }
    }
    return null; // Return null if no matching user is found
}

function saveUserToLocalstorage(userObject) {
    // Retrieve existing users from local storage (if any)
    var existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new userObject to the array
    existingUsers.push(userObject);

    // Save the updated array back to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Update userArr
    userArr = existingUsers;
}

function clearInputs() {
    signupUser.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}
function isEmailExist(){
    for(var i=0; i < userArr.length; i++){
        if (userArr[i].userEmail.toLowerCase() == signupEmail.value.toLowerCase()){
            return false;
        }
    }
}
//log out 
var logOut = document.getElementById("logOut");
logOut.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html"
})