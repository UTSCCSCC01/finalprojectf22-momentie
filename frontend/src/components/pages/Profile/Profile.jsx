import "./profile.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { backendHost } from '../constants';
import { useSelector } from 'react-redux'

export default function Profile() {

    const currentUserEmail = useSelector((state) => state.user.email)
    const navigate = useNavigate();

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
            navigate("/login");
        }).catch(function () {
            alert('Somethingwent wrong with the logout process.');
        });
    }

    return (

        // < !--Page box(100 %)-- >
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
                            <a href="#">Edit Profile</a>
                        </div>
                    </div>
                </div>
            </header>

            <div class="left">

                <div class="profile-upper">
                    {/* <!--
                    <div class="profile-photo">
                        <img src="../random.png" alt="to be changed" width="30" height="30">
                    </div>
                --> */}
                    <li><a href="#">follower|following</a></li>
                    {/* <!-- color change based on profile photo, to be added later--> */}
                </div>

                <div class="description">
                    description/tagline
                </div>

                <div class="profile-photo">
                    {/* <!-- --> */}
                    <img src={require("./random.png")} class="rounded-circle" width="100" height="100" />
                    <div class="photo-middle">
                        <div class="photo-middle-text">Upload Photo</div>
                    </div>
                </div>

                <div class="posts">
                    {/* <!-- -->
                    additional information and posts */}
                </div>

            </div>

            <div class="right">
                {/* <!-- time line starts here--> */}
                <div class="timeline">
                    <div class="icon-column">
                        {/* <!--
                        <i class="bi bi-clock" style="font-size: 33px;"></i>
                    --> */}
                        <img src={require("./icon_column.PNG")} />
                    </div>
                    <div class="experience-column">
                        <div class="experience1-head">
                            experience1
                        </div>
                        <div class="experience1">
                            content
                        </div>
                        <div class="experience2-head">
                            experience2
                        </div>
                        <div class="experience2">
                            content
                        </div>
                        <div class="experience3-head">
                            experience3
                        </div>
                        <div class="experience3">
                            content
                        </div>
                    </div>
                </div>

            </div>

            <div class="footer">
                {/* <!-- 留出来，以后想加footer就加--> */}
                <h2>{currentUserEmail}</h2>
            </div>

        </div>);
}