import "./signup.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { backendHost } from '../../../constants';
import { Link, Button, Alert, AlertTitle, CircularProgress, Box } from "@mui/material";
export default function SignUp() {
    // Get the user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [signingUp, setSigningUp] = useState(false);
    // const [userImage, setUserImage] = useState({ image_preview: null, image_file: null });

    // function handleEditUserImage(e) {
    //     let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    //     let image_as_files = e.target.files[0];

    //     if (image_as_files !== null) {
    //         console.log(image_as_base64);
    //         setUserImage({
    //             image_preview: image_as_base64,
    //             image_file: image_as_files,
    //         });
    //     }

    // }

    const navigate = useNavigate();

    function switchToLogin(e) {
        navigate("/login")
    }

    // Please do not write like this, so stupid:)
    function handleSignup(e) {
        setSigningUp(true);
        setErrorMessage("");
        if (email === '' || username === '' || password === '') {
            setSigningUp(false);
            return setErrorMessage('please enter all the fields:\n - email\n - password\n - username');
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
            setSigningUp(false);
            setErrorMessage("Registration failed!(User might already exist) Please do it again!!!");
        });
    };

    return (
        <Box sx={{ height: "100vh", width: "100%", display: "flex", flexDirection: "row" }}>
            <div class="contentBox">

                <header>
                    <div class="logo">
                        <img src={require("./logo.png")} alt="to be changed" />
                    </div>
                </header>

                {/* <!-- Title Box, contains the title of the page --> */}
                <div class="titleBox" style={{ marginLeft: "40%" }}>

                    {/* <!-- Register text --> */}
                    <div class="register">
                        Register
                    </div>

                    {/* <!-- Profile Picture --> */}
                    {/* <Tooltip title={"Upload Image"} followCursor>
                    <IconButton
                        component="label" sx={{ width: 100, height: 100, marginLeft: "100px", marginBottom: "20px" }}>
                        <input
                            hidden accept="image/*"
                            type="file"
                            onChange={(event) => {
                                handleEditUserImage(event);
                            }}
                        />
                        <Avatar

                            alt="Profile"
                            src={userImage.image_preview}
                            sx={{ width: 100, height: 100, contenteditable: "true" }}
                        />
                    </IconButton>
                </Tooltip> */}

                </div>

                {/* <!-- This box contains first row, email and username --> */}
                <div class="informationBox" style={{ marginTop: "20px", marginLeft: "40%" }}>

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


                </div>
                <div class="informationBox" style={{ marginTop: "20px", marginLeft: "40%" }}>
                    {/* <!-- right part of the box --> */}
                    <div class="inforLeft">

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
                <div class="informationBox" style={{ marginTop: "20px", marginLeft: "40%" }}>

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
                </div>
                {signingUp && <CircularProgress sx={{ marginLeft: "40%" }} color="secondary" />}
                {errorMessage && <Alert severity="error" variant="filled" sx={{ marginLeft: "40%", width: "300px" }}>
                    <AlertTitle>Error</AlertTitle>
                    An error Occured — <strong>{errorMessage}</strong>
                </Alert>}
                {/* <!-- Sign up button --> */}
                <div class="butBox">
                    <Button sx={{
                        color: "#BEACAC", background: "#D9D9D9", textAlign: "center", alignSelf: "center", width: "170px",
                        height: "40px", fontFamily: 'Inter', marginLeft: "40%",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "30px",
                        lineHeight: "20px",
                    }} id="submit" onClick={handleSignup} variant="contained">Sign Up</Button>
                </div>

                {/* <!-- Link box --> */}
                <div class="signUpLinkBox">
                    <Link sx={{
                        marginLeft: "40%",
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
            <Box sx={{ width: "40%" }}>
                <img src={require("./random.png")} class="image" alt="Login Picture" />
            </Box>
            {/* <!-- The image showing in the login page --> */}

        </Box>
    );
}