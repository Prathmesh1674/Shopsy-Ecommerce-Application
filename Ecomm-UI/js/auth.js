//const BASE_URL = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", registerUser);

    }

});

async function registerUser(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }

    const user = {

        name: name,
        email: email,
        password: password

    };

    try {

        const response = await fetch(
            `${BASE_URL}/users/register`,
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            }
        );

        if (response.ok) {

            alert("Registration Successful!");

            window.location.href = "login.html";

        } else {

            alert("Registration Failed!");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

}


function isLoggedIn() {
    return localStorage.getItem("token") != null;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    window.location.href = "login.html";
}
function checkLogin() {

    const token = localStorage.getItem("token");

    if(!token){

        window.location.href="login.html";

    }

    const userName = localStorage.getItem("userName");

    if(document.getElementById("userName")){

        document.getElementById("userName").innerText=userName;

    }

}

function loadUser() {

    const user = JSON.parse(localStorage.getItem("user"));

    if(user){

        const name = document.getElementById("userName");

        if(name){

            name.innerText = user.name;

        }

    }

}