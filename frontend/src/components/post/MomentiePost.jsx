import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { backendHost } from '../../constants';
import { useState, useEffect, useRef } from 'react';
import { Avatar, Dialog, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: '#D9D9D9',
}));


export default function RecipeReviewCard(props) {

  const { postList, match, deletePost } = props;

  return (
    <Box>
      {postList.map((post) => {
        return (
          <Item sx={{ maxWidth: 345, margin: "15px 0px 0px 0px" }} key={post._id}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Avatar
                alt={post.email}
                src={backendHost + `/profile/image?email=` + post.email}
                sx={{ width: 40, height: 40, marginTop: 1.5, marginLeft: 1, boxShadow: "0 0 5px 0 rgba(34, 34, 34, 1)" }}
                elevation={2}
              />
              <CardHeader
                action={
                  <IconButton aria-label="settings" onClick={() => { deletePost(post._id) }}>
                    {match ?
                      <DeleteIcon />
                      : null}
                  </IconButton>
                }
                title={<Typography sx={{ fontSize: 22, fontWeight: "bold" }} color="text.secondary">
                  {post.email}
                </Typography>}
              />
            </Box>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>
          </Item>
        );
      })}
    </Box>


  );
}
