import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState, useRef } from "react";
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

export default function BasicRating() {
    //get the current user email
    const email = useSelector((state) => state.email);
    // changing values
    const data = useRef(0);
    // saved value for rating
    const [value, setValue] = React.useState(data.current);

    //send get http request to database to get rating data
    axios.get('http://localhost:5000/profile/like?email', {
        params: {email}
    })
    .then(function (response) {
        setValue(response.data);
        data.current = response.data;
    })

    // async function getRating(email) {
    //     try {
    //         let response = await axios.get(`http://localhost:5000/profile/like?email`, 
    //         {params: {email}}
    //         );
    //         setValue(response.data);
    //         data.current = JSON.parse(response.data);
    //         console.log(data);
            
    //     }
    //     catch (error) {
    //         alert(error);
    //     }
    // }
    
    // console.log(data)

    return (
        <Box sx={{ display: "flex", alignItems:'center'}}>
            <Rating name="rate" value={value} readOnly precision={0.5} size="large" sx={{margin: "50px", alignSelf: "center"}} />
        </Box>
    );
}

