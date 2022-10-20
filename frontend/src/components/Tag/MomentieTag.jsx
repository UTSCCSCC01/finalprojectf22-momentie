import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useState, useEffect, useRef } from 'react';
import SelectInput from '@mui/material/Select/SelectInput';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));



export default function ChipsArray(props) {
  const { contentRef, edit } = props;
  const [tagList, setTagList] = useState(contentRef.current);

  const handleDelete = (tagToDelete) => {
    let newList = tagList.filter((tag) => tag.title !== tagToDelete.title);
    setTagList(newList);
    tagList.current = newList; 
  };

  const handleAdd = () => {
    let newList = [...tagList];
    let tag = "Tag";
    let finalTag = tag;
    let index = 1;
    while (tagList.filter((tag) => tag.title === finalTag).length != 0) {
        finalTag = tag + index.toString();
        index += 1;
    }
    newList.push({title: finalTag});
    setTagList(newList);
    tagList.current = newList; 
  }

  return (
    <Box>
      {edit ?<TextField
        required
        id="outlined-required"
        label="Required Tag"
        sx={{ margin: "10px"}}
      /> : null}
      {edit ?
      <Button variant="contained" onClick={handleAdd}>Add Tag</Button>: null}
      
      <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      
      {tagList.map((tag) => {
        let icon;
        return (
          <ListItem key={tag.title}>
            <Chip
              icon={icon}
              label={tag.title}
              onDelete={() => {handleDelete(tag)}}
            />
          </ListItem>
        );
      })}
    </Paper>
  </Box>
    
  );
}
