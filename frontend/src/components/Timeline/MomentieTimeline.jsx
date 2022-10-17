import Box from '@mui/material/Box';
import { Typography, Paper, Button, Divider, TextField } from '@mui/material';
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
            id: finalTopicName,
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

    function handleDeleteTopic(id) {
        let tempList = { ...timelineList };
        delete tempList[id];
        setTimelineList(tempList);
        contentRef.current = tempList;
        printData();
    }

    function handleAddItem(id) {
        let tempList = { ...timelineList };
        if (tempList[id] !== undefined && tempList[id] !== null) {
            let maxId = 0;
            for (var i = 0; i < tempList[id].length; i++) {
                if (tempList[id][i]._id >= maxId) {
                    maxId = tempList[id][i]._id + 1;
                };
            }
            tempList[id].unshift({
                _id: maxId,
                id: id,
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

    function handleTopicChange(e, id) {
        let newId = e.target.value;
        let tempList = { ...timelineList };
        if (tempList[id] !== undefined && tempList[id] !== null) {
            for (var i = 0; i < tempList[id].length; i++) {
                tempList[id][i].id = newId;
            }
            let tempObject = tempList[id];
            delete tempList[id];
            tempList[newId] = tempObject
            setTimelineList(tempList)
            contentRef.current = tempList;
            printData();
        }
    }
    function deleteItem(id, index) {
        let tempList = { ...timelineList };
        if (tempList[id] !== undefined && tempList[id] !== null) {
            if (index >= 0 && index < tempList[id].length) {
                tempList[id].splice(index, 1);
            }
            setTimelineList(tempList);
            contentRef.current = tempList;
            printData();
        }
    }

    function editItem(id, index, field, value) {
        if (timelineList[id] !== undefined && timelineList[id] !== null && field != "id" && field != "_id") {
            if (index >= 0 && index < timelineList[id].length) {
                timelineList[id][index][field] = value
            }
            contentRef.current = timelineList;
            printData();
        }
    }

    return (
        <form ref={formRef}>
            <Button onClick={() => formRef.current.reportValidity()}
            >CLICK TO SUBMIT</Button>
            <Box sx={{ display: "flex", flexDirection: "column", width: "fit-content", height: "fit-content", border: 3 }}>
                <Button variant="outlined" startIcon={<AddCircleIcon />}
                    sx={{ height: "20px", width: "50%", margin: "10px", alignSelf: "center" }} onClick={handleAddTopic}>
                    Add Topic
                </Button>
                <Box sx={{
                    width: "fit-content",
                    height: "fit-content", display: "flex",
                    flexWrap: "wrap", gap: "40px",
                }}>

                    {
                        Object.keys(timelineList).sort().map((id) => (
                            <div key={id} >
                                <Box
                                    sx={{
                                        width: "fit-content", height: heightStyle, overflowY: "auto", overflowX: "hidden"
                                        , position: "relative", display: "flex", flexDirection: "column", minWidth: "300px"
                                    }}
                                    key={id} >
                                    {editMode ? <TextField
                                        required
                                        id="filled-required"
                                        label="Required Topic"
                                        defaultValue={id}
                                        variant="filled"
                                        sx={{ margin: "10px" }}
                                        onBlur={(e) => handleTopicChange(e, id)}
                                    /> : <Typography
                                        sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                                        fontSize={width / timelineList.length / 12}  >
                                        {id}
                                    </Typography>}
                                    {allowTopicEdit && editMode &&
                                        <Button variant="outlined" startIcon={<DeleteIcon />}
                                            sx={{ backgroundColor: "white", height: "20px", width: "50%", alignSelf: "center" }}
                                            onClick={() => { handleDeleteTopic(id) }}>
                                            Delete Topic
                                        </Button>}
                                    <Divider sx={{ margin: "10px" }} />
                                    {editMode && <Button variant="outlined" startIcon={<AddIcon />}
                                        sx={{ backgroundColor: "white", height: "20px", width: "50%", alignSelf: "center" }}
                                        onClick={() => { handleAddItem(id) }}>
                                        Add Item
                                    </Button>}
                                    <Timeline >
                                        {timelineList[id].map((timelineItem, index) => (
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
        </form >
    );
}