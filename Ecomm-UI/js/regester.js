/*const BASE_URL = "http://localhost:8080";

document
    .getElementById("registerForm")
    .addEventListener("submit", registerUser);

async function registerUser(e) {

    e.preventDefault();

    const user = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    try {

        const response = await fetch(`${BASE_URL}/users/register`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(user)

        });

        if (response.ok) {

            alert("Registration Successful!");

            window.location.href = "login.html";

        }

        else {

            alert("Registration Failed");

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}*/

const BASE_URL = "http://localhost:8080";

document
    .getElementById("registerForm")
    .addEventListener("submit", registerUser);

async function registerUser(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Password validation using RegEx
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check password
    if (!passwordRegex.test(password)) {

        alert(
            "Password must contain:\n" +
            "• At least 8 characters\n" +
            "• At least one uppercase letter\n" +
            "• At least one lowercase letter\n" +
            "• At least one number\n" +
            "• At least one special character (@, $, !, %, *, ?, &)"
        );

        return;
    }

    const user = {

        name: name,
        email: email,
        password: password

    };

    try {

        const response = await fetch(`${BASE_URL}/users/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        });

        if (response.ok) {

            alert("Registration Successful!");

            window.location.href = "login.html";

        } else {

            alert("Registration Failed");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }
}