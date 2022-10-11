import './Login.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { backendHost } from '../constants';
import { useDispatch } from 'react-redux'
import { changeEmail } from '../../../reduxStore/userSlice';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        axios.defaults.withCredentials = true;
        axios.post(backendHost + `/account/login`,
            { "email": email, "password": password },
            {
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': backendHost,
                },
            }
        ).then((response) => {
            dispatch(changeEmail(response.data.email))
            navigate("/profile");
        }).catch(() => {
            alert("Incorrect username/password, or user doesn't exist");
        });
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