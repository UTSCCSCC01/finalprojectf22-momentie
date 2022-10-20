import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating() {
    // create a new XMLHttpRequest
    // var xhr = new XMLHttpRequest()
    // var data = null;
    // // get a callback when the server responds

    // // open the request with the verb and the url
    // var email = 'candy@gmail.com'
    // xhr.open('GET', `http://localhost:5000/profile/like?email=${email}`)
    // // send the request
    // xhr.send()
    // xhr.onload = function() {
    //     if (xhr.status === 200) {
    //         //parse JSON datax`x
    //         data = JSON.parse(xhr.responseText)
    //         console.log(data)
    //     } 
    //     else if (xhr.status === 404) {
    //         console.log("No records found")
    //     }
    // }

    const [value, setValue] = React.useState(2);

    return (
        <Box>
        <Typography component="legend">Read only</Typography>
        <Rating name="read-only" value={value} readOnly />
        <Typography component="legend">No rating given</Typography>
        <Rating name="no-value" value={null} />
        </Box>
    );
}

