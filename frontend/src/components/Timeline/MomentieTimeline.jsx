import Box from '@mui/material/Box';
import { Typography, Button, Divider, TextField, createTheme, ThemeProvider, withTheme } from '@mui/material';
import { Timeline } from '@mui/lab';
import { useState, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import MomentieTimelineItem from './MomentieTimelineItem';
import { fontSize } from '@mui/system';

/* Todo edit  */
export default function MomentieTimeline(props) {
    const { timelineList, setTimelineList, width, height, editMode, isSkill, section } = props;
    const [noItemLeft, setNoItemLeft] = useState(false)
    const heightStyle = height === undefined ? "50vh" : height;

    //styling
    const theme = createTheme({
        typography: {
            bigger: {
                fontSize: "70%",
                color: "white",
                lineHeight: 2.75,
            },
            smaller: {
                fontSize: "70%",
                color: "white",
                lineHeight: 2.125,
            },
        },
    });

    function handleAddTopic() {
        let topic = "Topic";
        let finalTopicName = topic;
        let index = 1;
        while (finalTopicName in timelineList) {
            finalTopicName = topic + index.toString();
            index += 1;
        }

        let topicObject = {};
        topicObject[finalTopicName] = [{
            topic: finalTopicName,
            title: "Temp Title",
            content: "Temp Content",
            startTime: new Date().toDateString(),
            endTime: new Date().toDateString(),
        }];
        let finalObject = { ...timelineList, ...topicObject }
        setTimelineList(finalObject);
    }

    function handleDeleteTopic(topic) {
        let tempList = { ...timelineList };
        delete tempList[topic];
        if (tempList.length != 0) {
            setTimelineList(tempList);
        }
        else {
            setNoItemLeft(true);
            setTimelineList(tempList);
        }
    }

    function handleAddItem(topic) {
        let tempList = { ...timelineList };
        if (tempList[topic] !== undefined && tempList[topic] !== null) {
            let maxId = 0;
            for (var i = 0; i < tempList[topic].length; i++) {
                if (tempList[topic][i]._id >= maxId) {
                    maxId = tempList[topic][i]._id + 1;
                };
            }
            tempList[topic].unshift({
                _id: maxId,
                topic: topic,
                title: "Temp Title",
                content: "Temp Content",
                startTime: new Date().toDateString(),
                endTime: new Date().toDateString(),
            })
            setTimelineList(tempList);
        }
    }

    function handleTopicChange(e, topic) {
        let newTopic = e.target.value;
        let tempList = { ...timelineList };
        if (tempList[topic] !== undefined && tempList[topic] !== null) {
            for (var i = 0; i < tempList[topic].length; i++) {
                tempList[topic][i].topic = newTopic;
            }
            let tempObject = tempList[topic];
            delete tempList[topic];
            tempList[newTopic] = tempObject
            setTimelineList(tempList)
        }
    }
    function deleteItem(topic, index) {
        let tempList = { ...timelineList };
        if (tempList[topic] !== undefined && tempList[topic] !== null) {
            if (index >= 0 && index < tempList[topic].length) {
                tempList[topic].splice(index, 1);
            }
            setTimelineList(tempList);
        }
    }

    function editItem(topic, index, field, value) {
        let tempList = { ...timelineList };
        if (tempList[topic] !== undefined && tempList[topic] !== null && field !== "topic" && field !== "_id") {
            if (index >= 0 && index < tempList[topic].length) {
                tempList[topic][index][field] = value
                setTimelineList(tempList);
            }
        }
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            height: "fit-content",
            justifyContent: "center",
            color: '#BEACAC',
        }}>
            <Typography sx={{ margin: "20px", fontWeight: "bold", fontSize: 24, }}>{section}</Typography>
            {editMode && isSkill &&
                <Button variant="outlined" startIcon={<AddCircleIcon />}
                    sx={{
                        height: "20px",
                        width: "fit-content",
                        margin: "10px",
                        alignSelf: "center",
                        borderRadius: "6%",
                        backgroundColor: "#BEACAC",
                        color: '#F5F5F5',
                        borderColor: "#BEACAC"
                    }} onClick={handleAddTopic}>
                    <ThemeProvider theme={theme}>
                        {noItemLeft ?

                            <Typography variant="smaller">Add Topic</Typography> :
                            <Typography variant="bigger">Add Topic</Typography>

                        }
                    </ThemeProvider>
                </Button>}
            <Box sx={{
                width: "fit-content",
                height: "fit-content", display: "flex",
                flexWrap: "wrap", gap: "40px",
                justifyContent: "center",
            }}>
                {
                    Object.keys(timelineList).sort().map((topic) => (
                        <Box key={topic} sx={isSkill ? {
                            color: '#BEACAC',
                            borderRadius: '6%',
                            border: 3
                        } : null}>
                            {editMode && isSkill ? <TextField
                                required
                                id="filled-required"
                                label="Required Topic"
                                defaultValue={topic}
                                variant="filled"
                                sx={{
                                    margin: "10px",
                                    alignSelf: "center"
                                }}
                                onBlur={(e) => handleTopicChange(e, topic)}
                            /> : <Typography
                                sx={{ fontWeight: 'bold', textTransform: 'uppercase', padding: "10px" }}
                                fontSize={width / timelineList.length / 12}  >
                                {isSkill ? topic : ""}
                            </Typography>}
                            <Divider sx={{ margin: "10px" }} />
                            <Box
                                sx={{
                                    width: "fit-content", height: heightStyle, overflowY: "auto", overflowX: "hidden"
                                    , position: "relative", display: "flex", flexDirection: "column", minWidth: "300px",
                                }}
                                key={topic} >

                                {isSkill && editMode &&
                                    <Button variant="outlined" startIcon={<DeleteIcon />}
                                        sx={{
                                            backgroundColor: "white",
                                            height: "20px",
                                            width: "50%",
                                            p: 0,
                                            alignSelf: "center",
                                            borderRadius: "6%",
                                            backgroundColor: "#BEACAC",
                                            color: '#F5F5F5',
                                            borderColor: "#BEACAC"
                                        }}
                                        onClick={() => { handleDeleteTopic(topic) }}>
                                        <ThemeProvider theme={theme}>
                                            {noItemLeft ?

                                                <Typography variant="smaller">Delete Topic</Typography> :
                                                <Typography variant="bigger">Delete Topic</Typography>

                                            }
                                        </ThemeProvider>
                                    </Button>}
                                {editMode && isSkill && <Divider sx={{ margin: "10px" }} />}
                                {editMode &&
                                    <Button variant="outlined" startIcon={<AddIcon />}
                                        sx={{
                                            backgroundColor: "white",
                                            height: "20px",
                                            width: "50%",
                                            alignSelf: "center",
                                            borderRadius: "6%",
                                            backgroundColor: "#BEACAC",
                                            color: '#F5F5F5',
                                            borderColor: "#BEACAC"
                                        }}
                                        onClick={() => { handleAddItem(topic) }}>
                                        Add Item
                                    </Button>
                                }
                                <Timeline>
                                    {timelineList[topic].map((timelineItem, index) => (
                                        <div key={timelineItem._id}>
                                            <MomentieTimelineItem index={index} timelineItem={timelineItem} width={width} editMode={editMode} isSkill={isSkill} deleteItem={deleteItem} editItem={editItem} />
                                        </div>
                                    ))}
                                </Timeline>
                            </Box>
                        </Box>
                    ))
                }
            </Box >
        </Box>
    );
}
