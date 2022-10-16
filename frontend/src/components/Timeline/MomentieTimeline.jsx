import Box from '@mui/material/Box';
import { Typography, Paper, Button } from '@mui/material';
import { Timeline } from '@mui/lab';
import { useState, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MomentieTimelineItem from './MomentieTimelineItem';


export default function MomentieTimeline(props) {
    const { contentList, width, height, editMode, allowTopicEdit } = props;
    const formRef = useRef();
    const widthStyle = width === undefined ? "fit-content" : width;
    const heightStyle = height === undefined ? "50vh" : height;
    return (
        <form ref={formRef}>
            <Button onClick={() => formRef.current.reportValidity()}
            >CLICK TO SUBMIT</Button>
            <Box sx={{
                height: heightStyle, display: "flex",
                flexWrap: "wrap", gap: "40px"
            }}>
                {
                    Object.keys(contentList).map((id) => (
                        <Box
                            sx={{
                                width: "fit-content", height: heightStyle, overflowY: "auto", overflowX: "hidden"
                                , position: "relative"
                            }}
                            key={id} >
                            {allowTopicEdit && editMode && <Button variant="outlined" startIcon={<DeleteIcon />}
                                sx={{ position: "absolute", top: "3px", right: "50px", backgroundColor: "white", height: "20px" }}>
                                Delete Topic
                            </Button>}
                            <Typography
                                sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                                fontSize={width / contentList.length / 12}  >
                                {id}
                            </Typography>
                            {contentList[id].map((timelineItem, index) => (
                                <Timeline key={index}>
                                    <MomentieTimelineItem timelineItem={timelineItem} width={width} editMode={editMode} />
                                </Timeline>
                            ))}
                        </Box>
                    ))
                }
            </Box >
        </form>
    );
}