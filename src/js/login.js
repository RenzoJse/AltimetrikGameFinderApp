var email = document.getElementById("emailB");
var passwordB = document.getElementById("passwordB");
let loginButton = document.getElementById("botonId");

loginButton.addEventListener("click", () => {
    console.log(passwordB.value);
    loginRequest();
});


const loginRequest = async function() { 
    const response = await fetch("./login.html", {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.value,
        password: passwordB.value}),
    });
    const responseJson = await response.json();
    if (response.status === 200) {
        document.cookie = 'authToken' + responseJson.accessToken;
        console.log('ok');
        window.location = 'main.html';
    } else if (response.status === 400) {

        console.log(response);
        emailError.textContent += "Enter a valid email";
        document.getElementsByClassName('email-Box')[0].classList.add('error-input');

        passwordError.textContent += "Enter a valid password";
        password.style.color = '#E07979';
    } 

};
