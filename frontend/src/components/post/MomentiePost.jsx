import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';





export default function RecipeReviewCard(props) {

  const {postList, setPostList, postEdit} = props;
  
  const handleDelete = (postToDelete) => {
    let newList = postList.filter((post) => post._id !== postToDelete);
    setPostList(newList);
  };

  return (
    <Box>
      {postList.map((post) => {
        return (
          <Card sx={{ maxWidth: 345 , margin: "15px 0px 0px 0px"}} key = {post._id}>
            <CardHeader
            action={
              <IconButton aria-label="settings">
                {postEdit ? 
                <DeleteIcon onClick={() => { handleDelete(post._id) }}/>
                :null}
              </IconButton>
            }
              title= {post.email}
            />
            
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>
          </Card>
        );
      })}      
    </Box>

    
  );
}
