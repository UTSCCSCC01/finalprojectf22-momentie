import "./profile.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { backendHost } from '../../../constants';
import { changeEmail } from "../../../reduxStore/userSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useState, useRef } from "react";
import { Button, TextField, Box } from '@mui/material'
import { brown } from '@mui/material/colors';
import MomentieTimeline from "../../Timeline/MomentieTimeline";

const secondary = brown['A400']
const timelineData = {
    "experience": [{
        topic: "experience",
        title: "first",
        content: "somethingasasdddddddddddddddddddddddddddddddddddddddddddd",
        startTime: "2022-10-05T04:38:26.022Z",
        endTime: "2022-10-05T04:38:26.022Z",
    },
    {
        topic: "experience",
        title: "second",
        content: "something",
        startTime: "2022-10-05T04:38:26.022Z",
        endTime: "2022-10-05T04:38:26.022Z",
    }, {
        topic: "experience",
        title: "first",
        content: "something",
        startTime: "2022-10-05T04:38:26.022Z",
        endTime: "2022-10-05T04:38:26.022Z",
    }, {
        topic: "experience",
        title: "first",
        content: "something",
        startTime: "2022-10-05T04:38:26.022Z",
        endTime: "2022-10-05T04:38:26.022Z",
    }]
}


for (const property in timelineData) {
    for (var i = 0; i < timelineData[property].length; i++) {
        timelineData[property][i]._id = i;
    }
}

export default function Profile() {

    const [edit, setEdit] = useState(false);
    const [username, setUserName] = useState("");
    const timelineRef = useRef(timelineData);
    const [timelineBackup, setTimeLineBackup] = useState(timelineRef.current);
    // changing values
    const descriptionRef = useRef("");
    // saved value
    const [description, setDescription] = useState(descriptionRef.current);

    const currentUserEmail = useSelector((state) => state.email);

    //customize color
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleSave() {
        try {
            await editProfileAPI(currentUserEmail, descriptionRef.current);
            setDescription(descriptionRef.current);
            setTimeLineBackup(timelineRef.current);
            setEdit(false);
        }
        catch (e) {
            handleCancel();
        }

    }

    function handleCancel() {
        timelineRef.current = timelineBackup;
        descriptionRef.current = description;
        setEdit(false)
    }

    function handleEditDescription(e) {
        descriptionRef.current = e.target.value;
    }

    async function editProfileAPI(email, description) {
        axios.defaults.withCredentials = true;
        try {
            await axios.patch(backendHost + `/profile/`,
                { description: description },
                {
                    params: { email: email },
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
        } catch (e) {
            alert(e);
        }

    }

    async function getProfile(email) {
        axios.defaults.withCredentials = true;
        try {
            let res = await axios.get(backendHost + `/profile/`,
                {},
                {
                    params: { email: email },
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setDescription(res.data[0].description);
            descriptionRef.current = res.data[0].description;
        } catch (e) {
            alert(e);
        }

    }

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
        } else {
            getProfile(currentUserEmail);
        }
    }, [edit]);

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
                            {!edit ? <a href="#" onClick={() => { setEdit(true) }}>Edit Profile</a> : null}
                        </div>
                    </div>
                    {edit ?
                        <div>
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                color="secondary"
                                size="small"
                                sx={{ m: 2, p: 0 }}
                                style={{
                                    borderRadius: 3,
                                    backgroundColor: "#BEACAC",
                                    fontSize: "14px"
                                }}>Done</Button>
                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                color="secondary"
                                size="small"
                                sx={{ m: 1, p: 0 }}
                                style={{
                                    borderRadius: 3,
                                    color: "#BEACAC",
                                    fontSize: "14px"
                                }}>Cancel</Button>
                        </div> : null}
                </div>
            </header>

            <div class="left">

                <div class="profile-upper">
                    {/* <!--
                    <div class="profile-photo">
                        <img src="../random.png" alt="to be changed" width="30" height="30">
                    </div>
                --> */}
                    {currentUserEmail}
                    <li><a href="#">follower|following</a></li>
                    {/* <!-- color change based on profile photo, to be added later--> */}
                </div>

                <div class="description">
                    <Box>
                        <p>description/tagline</p>
                        {edit ? <TextField
                            required
                            id="filled-required"
                            label="Required Description"
                            defaultValue={descriptionRef.current}
                            variant="filled"
                            onChange={(e) => { handleEditDescription(e) }}
                        /> : <p>{descriptionRef.current}</p>}
                    </Box>
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

            <Box class="right">
                {/* <!-- time line starts here--> */}
                <MomentieTimeline contentRef={timelineRef} width="300px" editMode={edit} allowTopicEdit={true} />

            </Box>

            <div class="footer">
                {/* <!-- 留出来，以后想加footer就加--> */}
                <h2>{currentUserEmail}</h2>
            </div>

        </div>);
}