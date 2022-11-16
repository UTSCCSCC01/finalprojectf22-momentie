import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));



export default function ChipsArray(props) {
  const { tagList, setTagList, edit } = props;
  const tagName = useRef('');

  const handleDelete = (tagToDelete) => {
    let newList = tagList.filter((tag) => tag.title !== tagToDelete.title);
    setTagList(newList);
  };

  const handleAdd = () => {
    let newList = [...tagList];
    if (tagName.current !== undefined && tagName.current !== null && tagName.current !== '' &&
      tagList.filter((tag) => tag.title === tagName.current).length == 0) {
      newList.push({ title: tagName.current });
      setTagList(newList);
    }

  }

  const handleAddTagName = (e) => {
    tagName.current = e.target.value;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: 'center' }}>

        {edit ? <TextField
          required
          id="outlined-required"
          label="Required Tag"
          sx={{ margin: "10px" }}
          onChange={(e) => { handleAddTagName(e) }}
        /> : null}
        {edit ?
          <Button variant="contained" onClick={handleAdd} 
          sx={{backgroundColor: "#BEACAC",
          color: '#F5F5F5',
          borderColor: "#BEACAC"}}>Add Tag</Button> : null}
      </Box>


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
              {edit ? <Chip
                icon={icon}
                label={tag.title}
                onDelete={() => { handleDelete(tag) }}
              /> : <Chip
                icon={icon}
                label={tag.title}
              />}

            </ListItem>
          );
        })}
      </Paper>
    </Box>

  );
}
