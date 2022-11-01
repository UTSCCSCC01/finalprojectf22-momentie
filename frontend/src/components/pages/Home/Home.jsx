import "./Home.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { backendHost } from '../../../constants';
import { changeEmail } from "../../../reduxStore/userSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useState, useRef } from "react";
import { Button, TextField, Box, getTablePaginationUtilityClass } from '@mui/material'

export default function Home() {

    const [username, setUserName] = useState("");
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
            alert('Somethingwent wrong with the logout process.');
            navigate("/login");
        });
    }

    useEffect(() => {
        if (currentUserEmail === "") {
            navigate("/login");
        } else {}
    }, );

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
                    <div class="search-container">
                        <form action="/action_page.php">
                            <input type="text" placeholder="Search.." name="search" class="search-bar" />
                            <button type="submit">GO<i class="fa fa-search"></i></button>
                        </form>
                    </div>
                    {/* <!-- button of header --> */}
                    <nav>
                        <ul>
                            <li><a href="#">Home</a></li>
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