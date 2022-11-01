import React from 'react';
import Profile from '../../components/pages/Profile/Profile.jsx'
import Box from '@mui/material/Box';
import { useState, useRef } from "react";
import {useSelector, useDispatch} from 'react-redux';

export default function BasicRating() {
    // const [rating, setRating] = useState(0);
    // async function getRating(email) {
    //     axios.defaults.withCredentials = true;
    //     try {
    //         //send get http request to database to get rating data
    //         let response = await axios.get(backendHost + '/profile/like?email', {
    //             params: { email },

    //         },
    //             {
    //                 headers: {
    //                     'Access-Control-Allow-Credentials': true,
    //                     'Access-Control-Allow-Origin': backendHost,
    //                 },
    //             });
    //         setRating(response.data);
    //     }
    //     catch (e) {
    //         alert(e);
    //     }
    // }

    return (
        <Box>
            <Profile />
            <h1>hello</h1>
        </Box>
    );
}