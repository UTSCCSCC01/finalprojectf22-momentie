import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

export default function BasicRating(props) {
    const { rating, setRating } = props

    return (
        <Box sx={{ display: "flex", alignItems: 'center' }}>
            <Typography>Rating</Typography>
            <Rating name="rate" value={rating} readOnly precision={0.5} size="large" sx={{ margin: "50px", alignSelf: "center" }} />
        </Box>
    );
}

