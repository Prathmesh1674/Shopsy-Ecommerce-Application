//const BASE_URL = "http://localhost:8080";

document
    .getElementById("loginForm")
    .addEventListener("submit", loginUser);

async function loginUser(e) {

    e.preventDefault();

    const loginData = {

        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value

    };

    try {

        const response = await fetch(`${BASE_URL}/auth/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)

        });

        if (!response.ok) {

            alert("Invalid Email or Password");

            return;
        }

        const data = await response.json();

        console.log(data);
        console.log("LOGIN RESPONSE:", data);

        localStorage.setItem("userId", data.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);

        alert("Login Successful!");

        window.location.href = "index.html";

    }
    catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

}