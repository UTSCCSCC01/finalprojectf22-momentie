import "./signup.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { backendHost } from '../../../constants';
import { Link, Button } from "@mui/material";
export default function SignUp() {
    // Get the user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    function switchToLogin(e) {
        navigate("/login")
    }

    // Please do not write like this, so stupid:)
    function handleSignup(e) {
        if (email === '') {
            return alert('please enter the email address')
        }
        if (username === '') {
            return alert('please enter the username')
        }
        if (password === '') {
            return alert('please enter the password')
        }

        //console.log('123123', email.value, username.value, password.value)

        // HTTP request
        axios.defaults.withCredentials = true;
        axios.post(backendHost + `/account/signup`,
            { email: email, password: password, username: username },
            {
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': backendHost,
                },
            }
        ).then(() => {
            navigate("/login");
        }).catch(function () {
            alert('Registration failed!(User already exist) Please do it again!!!');
        });
    };

    return (
        // < !--This is the box contains whole page-- >
        <div class="contentBox">

            {/* <!-- Logo box --> */}
            <div class="logoBox">

                {/* <!-- logo text --> */}
                <div class="logo">
                    Momentie
                </div>

            </div>

            {/* <!-- Title Box, contains the title of the page --> */}
            <div class="titleBox">

                {/* <!-- Register text --> */}
                <div class="register">
                    Register
                </div>

                {/* <!-- Profile Picture --> */}
                <div class="picture">
                    Upload Picture
                </div>

            </div>

            {/* <!-- This box contains first row, email and username --> */}
            <div class="informationBox">

                {/* <!-- Left part of the box --> */}
                <div class="inforLeft">

                    {/* <!-- Text --> */}
                    <div class="label">
                        e-mail
                    </div>
                    {/* <!-- input box --> */}
                    <input
                        type="text"
                        placeholder="please input your email address"
                        class="ipt"
                        id="email"
                        onChange={e => setEmail(e.target.value)} />

                </div>

                {/* <!-- right part of the box --> */}
                <div class="inforRight">

                    {/* <!-- Text --> */}
                    <div class="label">
                        username
                    </div>
                    {/* <!-- input box --> */}
                    <input
                        type="text"
                        placeholder="please input your username"
                        class="ipt"
                        id="username"
                        onChange={e => setUsername(e.target.value)} />

                </div>

            </div>

            {/* <!-- This box contains second row, password and join in as --> */}
            <div class="informationBox" style={{ "margin-top": "20px" }}>

                {/* <!-- Left part of the box --> */}
                <div class="inforLeft">

                    {/* <!-- Text --> */}
                    <div class="label">
                        password
                    </div>
                    {/* <!-- input box --> */}
                    <input
                        type="text"
                        placeholder="please input your password"
                        class="ipt"
                        id="password"
                        onChange={e => setPassword(e.target.value)} />

                </div>

                {/* <!-- right part of the box --> */}
                <div class="inforRight">

                    {/* <!-- Text --> */}
                    <div class="label">
                        join in as
                    </div>
                    {/* <!-- input box --> */}
                    <input type="text" placeholder="please input your identity" class="ipt" id="identity" />

                </div>
            </div>

            {/* <!-- Sign up button --> */}
            <div class="butBox">
                <Button sx={{
                    color: "#BEACAC", background: "#D9D9D9", textAlign: "center", alignSelf: "center", width: "170px",
                    height: "40px", fontFamily: 'Inter', marginLeft: "100px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "30px",
                    lineHeight: "20px",
                }} id="submit" onClick={handleSignup} variant="contained">Sign Up</Button>
            </div>

            {/* <!-- Link box --> */}
            <div class="linkBox">
                <Link sx={{
                    marginLeft: "100px",
                    fontFamily: 'Inter',
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#BEACAC",
                }} underline="hover" onClick={switchToLogin}>
                    {"Already have an account? Login here"}
                </Link>
            </div>

        </div >
    );
}