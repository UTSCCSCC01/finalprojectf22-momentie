import './Login.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { backendHost } from '../../../constants';
import { useDispatch } from 'react-redux'
import { changeEmail } from '../../../reduxStore/userSlice';
import { Button, Link, Alert, AlertTitle, CircularProgress } from '@mui/material';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
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
            setErrorMessage("Please fill in your email and password!");
            return;
        }
        else {    //send http request if no field is empty
            setLoggingIn(true);
            setErrorMessage("");
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
            dispatch(changeEmail(response.data.email));
            setLoggingIn(false);
            navigate("/profile");
        }).catch(() => {
            setLoggingIn(false);
            setErrorMessage("Incorrect username/password, or user doesn't exist");
        });
    }

    return (
        // < !--Page box(Covers 100 % of the webpage)-- >
        <div class="page">

            {/* <!-- left part of the webpage(60%) --> */}
            <div class="left">

                {/* <!-- LogoBox:Store the logo "Momentie" --> */}
                <header>
                    <div class="logo">
                        <img src={require("./logo.png")} alt="to be changed" />
                    </div>
                </header>

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
                {loggingIn && <CircularProgress sx={{ marginTop: "5vh", marginLeft: "40%" }} color="secondary" />}
                {errorMessage && <Alert severity="error" variant="filled" sx={{ marginTop: "5vh", marginLeft: "40%", width: "300px" }}>
                    <AlertTitle>Error</AlertTitle>
                    An error Occured — <strong>{errorMessage}</strong>
                </Alert>}
                {/* <!-- Login button Box: Store the login Button --> */}
                <div class="loginButtonBox">
                    <Button sx={{
                        color: "#BEACAC", background: "#D9D9D9", textAlign: "center", alignSelf: "center", width: "150px",
                        height: "40px", fontFamily: 'Inter',
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "30px",
                        lineHeight: "20px",
                        marginLeft: "40%",
                        marginTop: "5vh"
                    }} id="login" onClick={check} variant="contained">Log In</Button>
                </div>

                {/* <!-- Link Box: Store the link redirect to signup page --> */}
                <div class="loginLinkBoxs">
                    <Link sx={{
                        marginTop: "5vh",
                        marginLeft: "40%",
                        fontFamily: 'Inter',
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "15px",
                        color: "#BEACAC",
                    }} underline="hover" onClick={swicthToSignup}>
                        {"Don't have an account? Register here"}
                    </Link>
                </div>
            </div>

            {/* <!-- right part of the webpage(60%) --> */}
            <div class="loginRight">
                {/* <!-- The image showing in the login page --> */}
                <img src={require("./LoginPic.png")} class="image" alt="Login Picture" />
            </div>
        </div >
    );
}