import "./profile.css";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { backendHost } from '../../../constants';
import { changeEmail } from "../../../reduxStore/userSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useState, useRef } from "react";
import { Button, TextField, Box, getTablePaginationUtilityClass, Alert, AlertTitle, CircularProgress, Typography, IconButton, Avatar, getImageListItemBarUtilityClass } from '@mui/material'
import MomentieTimeline from "../../Timeline/MomentieTimeline";
import MomentieTag from "../../Tag/MomentieTag";
import Rate from '../../Rating/Rate.jsx';
import MomentiePost from "../../post/MomentiePost";
import PhotoCamera from '@mui/icons-material/PhotoCamera';


export default function Profile() {

    const [edit, setEdit] = useState(false);
    const [username, setUserName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [timelineList, setTimelineList] = useState({});
    const timelineBackup = useRef(JSON.parse(JSON.stringify(timelineList)));
    const [skillTimeline, setSkillTimeline] = useState({});
    const skillTimelineBackup = useRef(JSON.parse(JSON.stringify(skillTimeline)));

    const [tagList, setTagList] = useState([]);
    const tagListBackup = useRef(JSON.parse(JSON.stringify(tagList)));

    const [description, setDescription] = useState("");
    const descriptionBackup = useRef(JSON.parse(JSON.stringify(description)));

    const [userImage, setUserImage] = useState({ image_preview: null, image_file: null });

    const [postContent, setPostContent] = useState("");

    const [rating, setRating] = useState(0);
    const currentUserEmail = useSelector((state) => state.email);

    var currentEmail = currentUserEmail;
    var match = true;

    const profileEmail = useParams().email;

    // check if the currentLoginUser email matches the profile user email that routes to
    checkEmailMatch();

    const [postList, setPostList] = useState([]);
    const postListBackup = useRef(JSON.parse(JSON.stringify(postList)));

    //customize color
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleSave() {
        setLoading(true);
        if (!await editProfileAPI(currentUserEmail, description) ||
            !await changeTags() || !await changeTimeline() || !await changeUserImage()) {
            setLoading(false);
            setErrorMessage("Some save failed.");
            handleCancel();
        }

        descriptionBackup.current = JSON.parse(JSON.stringify(description));
        skillTimelineBackup.current = JSON.parse(JSON.stringify(skillTimeline));
        timelineBackup.current = JSON.parse(JSON.stringify(timelineList));
        tagListBackup.current = JSON.parse(JSON.stringify(tagList));
        setLoading(false);
        setEdit(false);
    }

    function handleCancel() {
        setTagList(JSON.parse(JSON.stringify(tagListBackup.current)));
        setTimelineList(JSON.parse(JSON.stringify(timelineBackup.current)));
        setSkillTimeline(JSON.parse(JSON.stringify(skillTimelineBackup.current)));
        setDescription(JSON.parse(JSON.stringify(descriptionBackup.current)));
        setUserImage({ image_preview: null, image_file: null })
        setEdit(false);
    }

    function handleEditDescription(e) {
        setDescription(e.target.value);
    }

    function checkEmailMatch() {
        if (profileEmail != null && profileEmail != currentUserEmail) {
            match = false;
            currentEmail = profileEmail;
        }
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
            return true;
        } catch (e) {
            return false;
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
            setUserName(res.data.username);
        } catch (e) {
            setErrorMessage("Profile retrieve failed.")
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
            setErrorMessage("Profile retrieve failed.")
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
                    return false;
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
                    return false;
                }
            }
        }
        return true;
    }

    function handleEditUserImage(e) {
        let image_as_base64 = URL.createObjectURL(e.target.files[0]);
        let image_as_files = e.target.files[0];

        if (image_as_files !== null) {
            setUserImage({
                image_preview: image_as_base64,
                image_file: image_as_files,
            });
        }

    }

    async function changeUserImage() {
        if (!userImage.image_file) {
            return true
        }
        axios.defaults.withCredentials = true;
        try {
            let formData = new FormData();
            formData.append('file', userImage.image_file);
            await axios.post(backendHost + `/profile/upload`,
                formData,
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            return true;
        }
        catch (e) {
            return false;
        }
    }

    async function getPosts(email) {
        axios.defaults.withCredentials = true;
        try {
            let res = await axios.get(backendHost + `/post/user/` + email,
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setPostList(res.data);
        } catch (e) {
            setErrorMessage("Profile retrieve failed.")
        }
    }

    function handleEditPost(e) {
        setPostContent(e.target.value);
    }

    async function handleAddPostContent(email) {
        if (postContent !== undefined && postContent !== null && postContent !== '') {
            axios.defaults.withCredentials = true;
            try {
                await axios.post(backendHost + `/post/`,
                    { content: postContent, email: email },
                    {
                        headers: {
                            'Access-Control-Allow-Credentials': true,
                            'Access-Control-Allow-Origin': backendHost,
                        },
                    }
                );
                getPosts(email);
                return true;
            } catch (e) {
                return false;
            }
        }
    }

    async function deletePost(postId) {
        axios.defaults.withCredentials = true;
        try {
            await axios.delete(backendHost + `/post/id/` + postId,
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            let newList = postList.filter((post) => post._id !== postId);
            setPostList(newList);
            return true;
        } catch (e) {
            return false;
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
            navigate("/login");
        });
    }

    function gotoHomePage() {
        navigate("/home");
    }

    async function addRating(email, like) {
        axios.defaults.withCredentials = true;
        try {
            let res = await axios.patch(backendHost + `/profile/like`,
                { like: like },
                {
                    params: { email: email },
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setRating(res.data.like);
        } catch (e) {
            setErrorMessage("Rating profile failed.")
        }

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
            setErrorMessage("Profile retrieve failed.")
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
            setErrorMessage("Profile retrieve failed.")
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
            return true;
        } catch (e) {
            return false;
        }
    }

    useEffect(() => {
        if (currentUserEmail === "") {
            navigate("/login");
        } else {
            if (match == true) {
                getProfile(currentUserEmail);
                getTags(currentUserEmail);
                getTimeline(currentUserEmail);
                getRating(currentUserEmail);
                getPosts(currentUserEmail);
                if (userImage && !userImage.image_preview) {
                    userImage.image_preview = backendHost + `/profile/image?email=` + currentUserEmail
                }

            }
            //profile being visted
            else {
                getProfile(profileEmail);
                getTags(profileEmail);
                getTimeline(profileEmail);
                getRating(profileEmail);
                getPosts(profileEmail);
                if (userImage && !userImage.image_preview) {
                    userImage.image_preview = backendHost + `/profile/image?email=` + profileEmail
                }
            }
        }
    }, [edit]);

    return (
        <div class="page">
            {/* <!-- header of the page --> */}
            <header>
                <div class="headbar" style={{ marginLeft: "0" }}>
                    {/* <!-- logo of header --> */}
                    <h1 class="logo">
                        <img src={require("./logo.png")} alt="to be changed" />
                    </h1>
                    {/* <!-- serachbar of header --> */}
                    {/* <!-- button of header --> */}
                    <nav>
                        <ul>
                            <li><a onClick={gotoHomePage}>Home</a></li>
                            <li><a href="#">_____</a></li>
                            <li><a href="#">_____</a></li>
                            <li><a href="#">_____</a></li>
                        </ul>
                    </nav>
                    {/* <!-- dropdown me --> */}
                    <div class="dropdown" style={{ marginLeft: "auto" }}>
                        <button class="dropbtn">ME</button>
                        <div class="dropdown-content">

                            <a class="logout" onClick={logoutUser}>Logout</a>
                            {match && !edit ? <a href="#" onClick={() => { setEdit(true) }}>Edit Profile</a> : null}
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
                                }}>
                                Cancel
                            </Button>
                        </div> : null}
                    {loading && <CircularProgress size={30} sx={{ marginLeft: "20px" }} color="secondary" />}
                    {errorMessage && <Alert severity="error" variant="filled" sx={{ marginLeft: "10px", width: "400px", height: "40px" }}>
                        An error Occured — <strong>{errorMessage}</strong>
                    </Alert>}
                </div>
            </header >

            <div class="profileLeft">

                <div class="profile-upper">
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <Typography sx={{ textAlign: "left", fontSize: 20, fontWeight: 'bold' }}>{username ? username + " • " + currentEmail : currentEmail}</Typography>
                            <Box sx={{ display: "flex" }}>
                                <Avatar
                                    alt={currentEmail}
                                    src={userImage.image_preview}
                                    sx={{ width: 120, height: 120, boxShadow: "0 0 5px 0 rgba(34, 34, 34, 1)" }}
                                    elevation={2}
                                />
                                {edit ? <IconButton
                                    aria-label="upload picture"
                                    component="label"
                                    style={{
                                        borderRadius: 50,
                                        backgroundColor: "#BEACAC",
                                        color: "#F5F5F5",
                                        alignSelf: "end",
                                        height: "40px",
                                        width: "40px"
                                    }}>
                                    <input
                                        hidden accept="image/*"
                                        type="file"
                                        onChange={(event) => {
                                            handleEditUserImage(event);
                                        }}
                                    />
                                    <PhotoCamera />
                                </IconButton> : <Box sx={{ width: "40px" }} />}
                            </Box>
                        </Box>

                        <Box sx={{ marginLeft: "20px" }}>
                            {/* Put the Rating here */}
                            <Rate rating={rating} setRating={setRating} read={match} rate={(_, newValue) => { addRating(currentEmail, newValue) }} />
                        </Box>
                    </Box>
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

                </div>

                <div class="posts">
                    <MomentieTimeline timelineList={timelineList} setTimelineList={setTimelineList} width="55vw" height="70vh" editMode={edit} isSkill={false} section="Experiences" />
                </div>

            </div>

            <form id="myform" onSubmit={(e) => { e.preventDefault() }}>
                <div class="profileRight">
                    {/* <!-- time line starts here--> */}
                    <div class="skillRight">
                        <MomentieTimeline timelineList={skillTimeline} setTimelineList={setSkillTimeline} width="300px" height="40vh" editMode={edit} isSkill={true} section="Skills" />
                    </div>

                    <div className="userPost">
                        <Box>
                            <Typography sx={{ marginBottom: "20px", fontSize: "16pt", color: '#BEACAC' }}>Posts</Typography>
                            {match && <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <TextField
                                    id="outlined-required"
                                    label="Post Content"
                                    sx={{ margin: "px" }}
                                    onChange={(e) => { handleEditPost(e) }}
                                />
                                <Button variant="contained" onClick={(e) => { handleAddPostContent(currentUserEmail) }}
                                    sx={{
                                        backgroundColor: "#BEACAC",
                                        marginLeft: "20px",
                                        color: '#F5F5F5',
                                        borderColor: "#BEACAC"
                                    }}>Make Post</Button>
                            </Box>}
                        </Box>
                        <MomentiePost postList={postList} setPostList={setPostList} match={match} deletePost={deletePost} />
                    </div>
                </div>

            </form>



        </div >
    );
}