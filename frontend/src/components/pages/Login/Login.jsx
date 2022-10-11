import './Login.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function swicthToSignup() {
        navigate("/signup");
    }
    function isEmpty(str) {
        return !str.trim().length;
    }

    //function that checks if some input is empty and indicates 
    //user to re-enter the information.
    //send request if all fields are filled.
    function check(e) {
        if (isEmpty(email) || isEmpty(password)) {
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
        //redirect to profile page if account exist
        xhr.onreadystatechange = () => {
            //alert message if entered incorrect information
            if (xhr.readyState === 4) {
                if (xhr.status != 200) {
                    alert("Incorrect username/password, or user doesn't exist");
                }
                //Redirect to profile page if account exist
                else if (xhr.status == 200) {
                    navigate("/profile");
                }
            }
        };
        xhr.open('POST', `http://localhost:5000/account/login`);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => console.log(xhr.responseText);
        //Pack up the json data to be sent
        const data = { "email": email, "password": password };
        const jsonData = JSON.stringify(data);
        // console.log(jsonData);
        xhr.send(jsonData);
    }

    return (
        // < !--Page box(Covers 100 % of the webpage)-- >
        <div class="page">

            {/* <!-- left part of the webpage(60%) --> */}
            <div class="left">

                {/* <!-- LogoBox:Store the logo "Momentie" --> */}
                <div class="logoBox">
                    <div class="logo">
                        Momentie
                    </div>
                </div>

                {/* <!-- LoginHeader Box:Store the header "Sign In"--> */}
                <div class="LoginHeader">
                    <div class="loginText">
                        Sign In
                    </div>
                </div>

                {/* <!-- username Box: Store the username label --> */}
                <div class="usernameBox">
                    <div class="username">
                        Email
                    </div>
                </div>

                {/* <!-- username input Box: Store the username input from user --> */}
                <div class="usernameInputBox">
                    {/* <!-- Input according to email format --> */}
                    <input
                        type="email"
                        class="usernameInput"
                        placeholder="  Enter your email"
                        id="email"
                        onChange={e => setEmail(e.target.value)} />
                </div>

                {/* <!-- password Box: Store the password label --> */}
                <div class="passwordBox">
                    <div class="password">
                        Password
                    </div>
                </div>
                {/* <!-- password input box: Store the password input from user --> */}
                <div class="passwordInputBox">
                    {/* <!-- password input will not be seen by password format (ie *****)--> */}
                    <input
                        type="password"
                        class="passwordInput"
                        placeholder="  Enter your password"
                        id="password"
                        onChange={e => setPassword(e.target.value)} />
                </div>

                {/* <!-- Login button Box: Store the login Button --> */}
                <div class="loginButtonBox">
                    <button class="loginButton" id="login" onClick={check}>
                        Log In
                    </button>
                </div>

                {/* <!-- Link Box: Store the link redirect to signup page --> */}
                <div class="linkBox">
                    <a class="signuplink" onClick={swicthToSignup}>
                        don't have an account? register here
                    </a>
                </div>
            </div>

            {/* <!-- right part of the webpage(60%) --> */}
            <div class="right">
                {/* <!-- The image showing in the login page --> */}
                <img src={require("./LoginPic.png")} class="image" alt="Login Picture" />
            </div>
        </div>
    );
}