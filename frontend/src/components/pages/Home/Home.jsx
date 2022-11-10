import "./Home.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { backendHost } from '../../../constants';
import { changeEmail } from "../../../reduxStore/userSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useState, useRef } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, TextField } from "@mui/material";

export default function Home() {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const currentUserEmail = useSelector((state) => state.email);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function logoutUser() {
        axios.defaults.withCredentials = true;
        axios.post(backendHost + `/account/logout`,
            {},
            {
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Origin': backendHost,
                },
            }
        ).then(() => {
            dispatch(changeEmail(""));
            navigate("/login");
        }).catch(function () {
            alert('Something went wrong with the logout process.');
            navigate("/login");
        });
    }

    async function getHome(email) {
        axios.defaults.withCredentials = true;
        try {
            let res = await axios.get(backendHost + `/profile/`,
                { params: { email } },
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            //set favourite post
        } catch (e) {
            setErrorMessage("Home retrieve failed.")
        }

    }

    function gotoProfilePage() {
        navigate("/profile");
    }

    useEffect(() => {
        if (currentUserEmail === "") {
            navigate("/login");
        } else {
            getHome(currentUserEmail);
        }
    },);

    return (
        <div class="page">
            {/* <!-- header of the page --> */}
            <header>
                <div class="headbar">
                    {/* <!-- logo of header --> */}
                    <h1 class="logo">
                        <img src={require("./logo.png")} alt="to be changed" height="40" />
                    </h1>
                    {/* <!-- serachbar of header --> */}
                    {/* <!-- button of header --> */}
                    <nav>
                        <ul>
                            <li><a href="#" onClick={gotoProfilePage}>My Profile</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Moment</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                    {/* <!-- dropdown me --> */}
                    <div class="dropdown">
                        <button class="dropbtn">ME</button>
                        <div class="dropdown-content">

                            <a class="logout" onClick={logoutUser}>Logout</a>
                            {/* <!--
                            <button type="button" onclick="logoutUser()">Logout</button> --> */}
                            <a href="#">Setting</a>
                        </div>
                    </div>
                </div>
            </header >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%", marginTop: "10%", marginBottom: "10%" }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search By Email"
                        inputProps={{ 'aria-label': 'search by email' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ m: 0.6, borderRightWidth: 3 }} flexItem orientation="vertical" />
                    <Autocomplete
                        disablePortal
                        disableClearable
                        id="combo-box-demo"
                        defaultValue={{ label: 'By Email' }}
                        options={[{ label: 'By Email' }, { label: 'By Tags' }, { label: 'By Experience' }]}
                        getOptionLabel={(option) => option.label}
                        sx={{ width: 300, marginTop: "10px", marginBottom: "10px" }}
                        renderInput={(params) => <TextField {...params} defaultValue='By Email' type='text' label="Search Method" />}
                    />
                </Paper>
            </Box>
            <div class="left">
                <div class="mainpost">
                    <div class="post">
                        {currentUserEmail}

                    </div>

                </div>
                <div class="otherpost">
                    <div class="post">
                        other recomand post
                    </div>
                </div>
            </div>
            <div class="middle">
                {/* <!-- other recomand users --> */}
                <div class="post">
                    recomand users
                </div>

            </div>
            <div class="right">
                <div class="post">
                    tags
                </div>

            </div>

        </div >
    );
}