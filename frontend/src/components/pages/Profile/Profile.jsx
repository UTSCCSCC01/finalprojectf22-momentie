import "./profile.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { backendHost } from '../../../constants';
import { changeEmail } from "../../../reduxStore/userSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useState, useRef } from "react";
import { Button, TextField, Box, getTablePaginationUtilityClass } from '@mui/material'
import { brown } from '@mui/material/colors';
import MomentieTimeline from "../../Timeline/MomentieTimeline";
import MomentieTag from "../../Tag/MomentieTag";
import Rate from '../../Rating/Rate.jsx';

export default function Profile() {

    const [edit, setEdit] = useState(false);
    const [username, setUserName] = useState("");

    const [timelineList, setTimelineList] = useState({});
    const timelineBackup = useRef(JSON.parse(JSON.stringify(timelineList)));
    const [skillTimeline, setSkillTimeline] = useState({});
    const skillTimelineBackup = useRef(JSON.parse(JSON.stringify(skillTimeline)));

    const [tagList, setTagList] = useState([]);
    const tagListBackup = useRef(JSON.parse(JSON.stringify(tagList)));

    const [description, setDescription] = useState("");
    const descriptionBackup = useRef(JSON.parse(JSON.stringify(description)));

    const [rating, setRating] = useState(0);
    const currentUserEmail = useSelector((state) => state.email);

    //customize color
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleSave() {
        try {
            await editProfileAPI(currentUserEmail, description);
            await changeTags();
            await changeTimeline()
            descriptionBackup.current = JSON.parse(JSON.stringify(description));
            skillTimelineBackup.current = JSON.parse(JSON.stringify(skillTimeline));
            timelineBackup.current = JSON.parse(JSON.stringify(timelineList));
            tagListBackup.current = JSON.parse(JSON.stringify(tagList));
            setEdit(false);
        }
        catch (e) {
            handleCancel();
        }

    }

    function handleCancel() {
        setTagList(JSON.parse(JSON.stringify(tagListBackup.current)));
        setTimelineList(JSON.parse(JSON.stringify(timelineBackup.current)));
        setSkillTimeline(JSON.parse(JSON.stringify(skillTimelineBackup.current)));
        setDescription(JSON.parse(JSON.stringify(descriptionBackup.current)));
        setEdit(false);
    }

    function handleEditDescription(e) {
        setDescription(e.target.value);
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
                { params: { email } },
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setDescription(res.data.description);
            descriptionBackup.current = res.data.description;
        } catch (e) {
            alert(e);
        }

    }

    async function getTags(email) {
        axios.defaults.withCredentials = true;
        try {
            let res = await axios.get(backendHost + `/tag`,
                { params: { email } },
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setTagList(res.data);
            tagListBackup.current = res.data;
        } catch (e) {
            alert(e);
        }
    }

    async function changeTags() {
        for (let i of tagList) {
            if (tagListBackup.current.filter((tag) => tag.title === i.title).length === 0) {
                axios.defaults.withCredentials = true;
                try {
                    await axios.post(backendHost + `/tag`,
                        { title: i.title, type: "profession" },
                        {
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
        }
        for (let i of tagListBackup.current) {
            if (tagList.filter((tag) => tag.title === i.title).length == 0) {
                axios.defaults.withCredentials = true;
                try {
                    await axios.delete(backendHost + `/tag`,
                        { data: { type: "profession", title: i.title } },
                        {
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

    async function getRating(email) {
        axios.defaults.withCredentials = true;
        try {
            //send get http request to database to get rating data
            let response = await axios.get(backendHost + '/profile/like?email', {
                params: { email },

            },
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                });
            setRating(response.data);
        }
        catch (e) {
            alert(e);
        }
    }

    async function getTimeline(email) {
        axios.defaults.withCredentials = true;
        try {
            let res = await axios.get(backendHost + `/profile/` + email + `/timeline`,
                {},
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            if (res.data !== undefined || res.data !== null || res.data.length === 0) {
                if (res.data["experience"] === undefined) {
                    setTimelineList({ experience: [] });
                    timelineBackup.current = { experience: [] };
                } else {
                    let timelineData = { experience: res.data["experience"] };
                    for (const property in timelineData) {
                        for (var i = 0; i < timelineData[property].length; i++) {
                            timelineData[property][i]._id = i;
                        }
                    }
                    setTimelineList(timelineData);
                    timelineBackup.current = timelineData;
                }
                let skillTimelineData = { ...res.data };
                delete skillTimelineData.experience;
                for (const property in skillTimelineData) {
                    for (var i = 0; i < skillTimelineData[property].length; i++) {
                        skillTimelineData[property][i]._id = i;
                    }
                }
                setSkillTimeline(skillTimelineData);
                skillTimelineBackup.current = skillTimelineData;

            }
        } catch (e) {
            alert(e);
        }
    }

    async function changeTimeline() {
        axios.defaults.withCredentials = true;
        try {
            let body = [];
            for (const key of Object.keys(timelineList)) {
                for (const item of timelineList[key]) {
                    body.push(item);
                }
            }
            for (const key of Object.keys(skillTimeline)) {
                for (const item of skillTimeline[key]) {
                    body.push(item);
                }
            }
            body = body.map(({ _id, ...keepAttrs }) => keepAttrs)
            await axios.patch(backendHost + `/profile/` + currentUserEmail + `/timeline`,
                { timelineList: body },
                {
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

    useEffect(() => {
        if (currentUserEmail === "") {
            navigate("/login");
        } else {
            getProfile(currentUserEmail);
            getTags(currentUserEmail);
            getTimeline(currentUserEmail);
            getRating(currentUserEmail);
        }
    }, [edit]);

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
                                }}
                                type="submit" form="myform">Done</Button>
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
            </header >

            <div class="left">

                <div class="profile-upper">
                    {/* <!--
                    <div class="profile-photo">
                        <img src="../random.png" alt="to be changed" width="30" height="30">
                    </div>
                --> */}
                    {currentUserEmail}
                    <Box>
                        {/* Put the Rating here */}
                        <Rate rating={rating} setRating={setRating} />
                    </Box>
                    <li><a href="#">follower|following</a></li>
                    {/* <!-- color change based on profile photo, to be added later--> */}


                </div>

                <div class="description">
                    <Box>
                        <Box sx={{ marginBottom: "20px" }}>
                            <p>Description</p>
                            {edit ? <TextField
                                required
                                id="filled-required"
                                label="Required Description"
                                defaultValue={description}
                                variant="filled"
                                onChange={(e) => { handleEditDescription(e) }}
                            /> : <p>{description}</p>}
                        </Box>
                        {/* Put the tag here */}
                        <p>Tag</p>
                        <MomentieTag tagList={tagList} setTagList={setTagList} width={100} height={30} edit={edit} />
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
                    <MomentieTimeline timelineList={skillTimeline} setTimelineList={setSkillTimeline} width="300px" height="40vh" editMode={edit} isSkill={true} section="Skills" />
                </div>

            </div>

            <form id="myform" onSubmit={(e) => { e.preventDefault() }}>
                <Box class="right">
                    {/* <!-- time line starts here--> */}
                    <MomentieTimeline timelineList={timelineList} setTimelineList={setTimelineList} width="300px" height="70vh" editMode={edit} isSkill={false} section="Experiences" />
                </Box>
            </form>

        </div >
    );
}