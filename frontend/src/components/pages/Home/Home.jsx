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
import { Autocomplete, TextField, Chip, CircularProgress, Alert } from "@mui/material";
import MomentieUserList from "../../UserList/MomentieUserList";
import qs from 'qs'
const userList = [{ email: "lsp@gmail.com", username: "dead", like: 5 },
{ email: "candy@gmail.com", username: "", like: 5 },];
// const userList = null
export default function Home() {

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const currentUserEmail = useSelector((state) => state.email);
    const [dataList, setDataList] = useState([]);
    const [searchOption, setSearchOption] = useState({ label: 'By Email' });
    const [labelList, setLabelList] = useState([]);
    const [singleSearchText, setSingleSearchText] = useState('');

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

    async function handleSearchEmail() {
        axios.defaults.withCredentials = true;
        if (singleSearchText.trim().length == 0) {
            setDataList([])
            return;
        }
        try {
            setLoading(true);
            setErrorMessage("");
            let res = await axios.get(backendHost + `/profile/`,
                { params: { email: singleSearchText } },
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setDataList([res.data])
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setDataList([])
            if (e.response && e.response.status == 404) {
                setErrorMessage("Email not found")
            } else {
                setErrorMessage("Search Operation Failed")
            }

        }
    }

    async function handleSearchEmail() {
        axios.defaults.withCredentials = true;
        if (singleSearchText.trim().length == 0) {
            setDataList([])
            return;
        }
        try {
            setLoading(true);
            setErrorMessage("");
            let res = await axios.get(backendHost + `/profile/`,
                { params: { email: singleSearchText } },
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setDataList([res.data])
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setDataList([])
            if (e.response && e.response.status == 404) {
                setErrorMessage("Email not found")
            } else {
                setErrorMessage("Search Operation Failed")
            }
        }
    }

    async function handleSearchUsername() {
        axios.defaults.withCredentials = true;
        if (singleSearchText.trim().length == 0) {
            setDataList([])
            return;
        }
        try {
            setLoading(true);
            setErrorMessage("");
            let res = await axios.get(backendHost + `/account/name/` + singleSearchText,
                {},
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setDataList(res.data);
            setLoading(false);
            if (res.data.length === 0) {
                setErrorMessage("No User Found")
            }
        } catch (e) {
            setLoading(false);
            setDataList([])
            setErrorMessage("Search Operation Failed")
        }
    }

    async function handleSearchTag() {
        axios.defaults.withCredentials = true;
        if (labelList.length == 0) {
            setDataList([])
            return;
        }
        try {
            setLoading(true);
            setErrorMessage("");
            let res = await axios.get(backendHost + `/profile/?${labelList.map((n, index) => `tag[${index}]=${n}`).join('&')}`,
                {},
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setDataList(res.data);
            setLoading(false);
            if (res.data.length === 0) {
                setErrorMessage("No User Found")
            }
        } catch (e) {
            setLoading(false);
            setDataList([])
            setErrorMessage("Search Operation Failed")
        }
    }

    async function handleSearchExp() {
        axios.defaults.withCredentials = true;
        if (labelList.length == 0) {
            setDataList([])
            return
        }
        try {
            setLoading(true);
            setErrorMessage("");
            let res = await axios.get(backendHost + `/account/skill/search?${labelList.map((n, index) => `title[${index}]=${n}`).join('&')}`,
                {},
                {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': backendHost,
                    },
                }
            );
            setDataList(res.data);
            setLoading(false);
            if (res.data.length === 0) {
                setErrorMessage("No User Found")
            }
        } catch (e) {
            setLoading(false);
            setDataList([])
            setErrorMessage("Search Operation Failed")
        }
    }

    async function handleSearch() {
        switch (searchOption.label) {
            case 'By Email':
                await handleSearchEmail();
                break;
            case 'By Username':
                await handleSearchUsername();
                break;
            case 'By Tags':
                await handleSearchTag();
                break;
            case 'By Experience':
                await handleSearchExp();
                break;
            default:
                setDataList([])
                setErrorMessage("Search Operation Failed");
        }
    }

    function gotoProfilePage() {
        navigate("/profile");
    }

    useEffect(() => {
        if (currentUserEmail === "") {
            navigate("/login");
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%", marginBottom: "20px" }}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%", marginTop: "5%", border: "1px solid #999" }}
                >
                    {'By Email' === searchOption.label && <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search By Email"
                        inputProps={{ 'aria-label': 'search by email' }}
                        onChange={(e) => { setSingleSearchText(e.target.value) }}
                    />}
                    {'By Username' === searchOption.label && <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search By Username"
                        inputProps={{ 'aria-label': 'search by username' }}
                        onChange={(e) => { setSingleSearchText(e.target.value) }}
                    />}
                    {'By Tags' === searchOption.label && <Autocomplete
                        multiple
                        options={[]}
                        freeSolo
                        sx={{ ml: 1, flex: 1 }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip sx={{ height: "100%" }} label={option} {...getTagProps({ index })} />
                            ))
                        }
                        onChange={(_, v) => {
                            setLabelList(v);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={'Tags: Type in a label and hit enter to add to list'}
                            />
                        )}
                    />}

                    {'By Experience' === searchOption.label && <Autocomplete
                        multiple
                        options={[]}
                        freeSolo
                        sx={{ ml: 1, flex: 1 }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip sx={{ height: "100%" }} label={option} {...getTagProps({ index })} />
                            ))
                        }
                        onChange={(_, v) => {
                            setLabelList(v);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder={'Experiences: Type in a label and hit enter to add to list'}
                            />
                        )}
                    />}
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ m: 0.6, borderRightWidth: 3 }} flexItem orientation="vertical" />
                    <Autocomplete
                        disablePortal
                        disableClearable
                        id="combo-box-demo"
                        defaultValue={{ label: 'By Email' }}
                        value={searchOption}
                        options={[{ label: 'By Email' }, { label: 'By Username' }, { label: 'By Tags' }, { label: 'By Experience' }]}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.label === value.label}
                        sx={{ width: 300, marginTop: "10px", marginBottom: "10px" }}
                        onChange={(_, v) => { setSingleSearchText(''); setLabelList([]); setSearchOption(v) }}
                        renderInput={(params) => <TextField {...params} defaultValue='By Email' type='text' label="Search Method" />}
                    />

                </Paper>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%", marginBottom: "20px" }}>
                {loading && <CircularProgress size={30} sx={{}} color="secondary" />}
                {errorMessage && <Alert severity="error" variant="filled" sx={{}}>
                    An error Occured — <strong>{errorMessage}</strong>
                </Alert>}
            </Box>

            {dataList.length != 0 && <MomentieUserList userList={dataList}></MomentieUserList>}

            <div class="left">
                <div class="otherpost">
                    <div class="post">
                        Recommended Posts
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="post">
                    Popular tags
                </div>

            </div>

        </div >
    );
}