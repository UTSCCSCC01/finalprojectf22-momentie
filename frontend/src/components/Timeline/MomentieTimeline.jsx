import Box from '@mui/material/Box';
import { Typography, Button, Divider, TextField } from '@mui/material';
import { Timeline } from '@mui/lab';
import { useState, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import MomentieTimelineItem from './MomentieTimelineItem';

/* Todo edit  */
export default function MomentieTimeline(props) {
    const { contentRef, width, height, editMode, allowTopicEdit, printData } = props;
    const formRef = useRef();
    const [timelineList, setTimelineList] = useState(contentRef.current);
    const heightStyle = height === undefined ? "50vh" : height;

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
        contentRef.current = finalObject;
        printData();
    }

    function handleDeleteTopic(topic) {
        let tempList = { ...timelineList };
        delete tempList[topic];
        setTimelineList(tempList);
        contentRef.current = tempList;
        printData();
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
            contentRef.current = tempList;
            printData();
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
            contentRef.current = tempList;
            printData();
        }
    }
    function deleteItem(topic, index) {
        let tempList = { ...timelineList };
        if (tempList[topic] !== undefined && tempList[topic] !== null) {
            if (index >= 0 && index < tempList[topic].length) {
                tempList[topic].splice(index, 1);
            }
            setTimelineList(tempList);
            contentRef.current = tempList;
            printData();
        }
    }

    function editItem(topic, index, field, value) {
        if (timelineList[topic] !== undefined && timelineList[topic] !== null && field !== "topic" && field !== "_id") {
            if (index >= 0 && index < timelineList[topic].length) {
                timelineList[topic][index][field] = value
            }
            contentRef.current = timelineList;
            printData();
        }
    }

    return (
        <Box sx={{ display: "flex", 
            flexDirection: "column", 
            width: "fit-content", 
            height: "fit-content", 
            justifyContent: "center",
            color: '#BEACAC',
            borderRadius: '6%',
            border: 3 
            }}>
            {editMode && allowTopicEdit && 
            <Button variant="outlined" startIcon={<AddCircleIcon />}
                sx={{ height: "20px", 
                    width: "50%", 
                    margin: "10px", 
                    alignSelf: "center",
                    borderRadius: "6%",
                    backgroundColor: "#BEACAC", 
                    color: '#F5F5F5',
                    borderColor: "#BEACAC"
                }} onClick={handleAddTopic}>
                Add Topic
            </Button>}
            <Box sx={{
                width: "fit-content",
                height: "fit-content", display: "flex",
                flexWrap: "wrap", gap: "40px",
                justifyContent: "center"
            }}>
                {
                    Object.keys(timelineList).sort().map((topic) => (
                        <div key={topic} >
                            {editMode && allowTopicEdit ? <TextField
                                required
                                id="filled-required"
                                label="Required Topic"
                                defaultValue={topic}
                                variant="filled"
                                sx={{ margin: "10px",
                                    alignSelf: "center"
                                }}
                                onBlur={(e) => handleTopicChange(e, topic)}
                            /> : <Typography
                                sx={{ fontWeight: 'bold', textTransform: 'uppercase', padding: "10px"}}
                                fontSize={width / timelineList.length / 12}  >
                                {topic}
                            </Typography>}
                            <Divider sx={{ margin: "10px" }} />
                            <Box
                                sx={{
                                    width: "fit-content", height: heightStyle, overflowY: "auto", overflowX: "hidden"
                                    , position: "relative", display: "flex", flexDirection: "column", minWidth: "300px"
                                }}
                                key={topic} >

                                {allowTopicEdit && editMode &&
                                    <Button variant="outlined" startIcon={<DeleteIcon />}
                                        sx={{ backgroundColor: "white", 
                                            height: "20px", 
                                            width: "50%", 
                                            alignSelf: "center",
                                            borderRadius: "6%",
                                            backgroundColor: "#BEACAC", 
                                            color: '#F5F5F5',
                                            borderColor: "#BEACAC"
                                        }}
                                        onClick={() => { handleDeleteTopic(topic) }}>
                                        Delete Topic
                                    </Button>}
                                {editMode && allowTopicEdit && <Divider sx={{ margin: "10px" }} />}
                                {editMode && 
                                    <Button variant="outlined" startIcon={<AddIcon />}
                                        sx={{ backgroundColor: "white", 
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
                                <Timeline >
                                    {timelineList[topic].map((timelineItem, index) => (
                                        <div key={timelineItem._id}>
                                            <MomentieTimelineItem index={index} timelineItem={timelineItem} width={width} editMode={editMode} deleteItem={deleteItem} editItem={editItem} />
                                        </div>
                                    ))}
                                </Timeline>
                            </Box>
                        </div>
                    ))
                }
            </Box >
        </Box>
    );
}
