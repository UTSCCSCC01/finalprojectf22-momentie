window.onload = function () {
    // Get the user input
    var email = document.querySelector('#email')
    var username = document.querySelector('#username')
    var password = document.querySelector('#password')
    //var identity = document.querySelector('#identity')
    var submit = document.getElementById('submit')
    submit.addEventListener('click', function () {
        if (email.value == '') {
            return alert('please enter the email address')
        }
        if (username.value == '') {
            return alert('please enter the username')
        }
        if (password.value == '') {
            return alert('please enter the password')
        }

        console.log('123123', email.value, username.value, password.value)

        let xhr = new XMLHttpRequest();
        xhr.open("POST", `http://localhost:5000/account/signup?email=${email.value}&password=${password.value}&username${username.value}`);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => console.log(xhr.responseText);
        xhr.send();
    })
}