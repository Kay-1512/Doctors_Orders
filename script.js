// Add this script to handle sign up form submission
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Example: Send sign up data to backend using fetch API
    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Sign up successful:", data);
            // Optionally, redirect the user to the login page after successful sign up
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error("Error signing up:", error);
            // Optionally, display an error message to the user
        });

});
// ---------------------------------Login--------------------------------
// Add this script to handle login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Example: Send login data to backend using fetch API
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid email or password');
            }
        })
        .then(data => {
            console.log("Login successful:", data);
            // Optionally, redirect the user to the dashboard page after successful login
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            console.error("Error logging in:", error);
            // Display an error message to the user
            alert('Invalid email or password');
        });
});


