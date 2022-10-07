//Get the input email and password from user
var email = document.getElementById('email');
var password = document.getElementById('password');
//Referring to the action of login button.
const button = document.getElementById('login');

//Helper function to check if a string is empty after removing leading and ending zeros
function isEmpty(str) {
    return !str.trim().length;
}

//function that checks if some input is empty and indicates 
//user to re-enter the information.
//send request if all fields are filled.
function check() {
    if (isEmpty(email.value) || isEmpty(password.value)) {
        return alert("Please fill in your email and password!");
    }
    else {    //send http request if no field is empty
        request();
    }
}

//Send Http request and JSON data to the Login API
const request = () => {

    const xhr = new XMLHttpRequest();
    //Indicate user if entered incorrect information or user doesn't exist
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState === 4 && xhr.status != 200) {
            alert("Incorrect username/password, or user doesn't exist");
        }
    });
    xhr.open('POST', `http://localhost:5000/account/login?email=${email.value}&password=${password.value}`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => console.log(xhr.responseText);
    //Pack up the json data to be sent
    const data = {"email":email.value,"password":password.value};
    const jsonData = JSON.stringify(data);
    // console.log(jsonData);
    xhr.send(jsonData);
}

//Login button on_click action.
button.addEventListener('click', check);
