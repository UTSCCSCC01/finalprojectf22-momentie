import { TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector, TimelineDot, TimelineOppositeContent } from '@mui/lab'
import { Typography, Paper, Button, Box, TextField } from '@mui/material';
import dayjs from 'dayjs'
import { useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function MomentieTimelineItem(props) {
    const { index, timelineItem, width, editMode, deleteItem, editItem } = props
    const [startTime, setStartTime] = useState(dayjs(timelineItem.startTime));
    const [endTime, setEndTime] = useState(dayjs(timelineItem.endTime));
    const [isEditStartTime, setIsEditStartTime] = useState(false);
    const [isEditEndTime, setIsEditEndTime] = useState(false);

    const handleChangeTitle = (event) => {
        editItem(timelineItem.topic, index, "title", event.target.value);
    };
    const handleChangeContent = (event) => {
        editItem(timelineItem.topic, index, "content", event.target.value);
    };
    const handleChangeEndTime = (value) => {
        if (!value || !value.isValid()) {
            value = endTime;
        }
        setEndTime(value, editItem(timelineItem.topic, index, "endTime", endTime.toDate().toISOString()));
    }
    const handleChangeStartTime = (value) => {
        if (!value) {
            value = startTime;
        }
        setStartTime(value, editItem(timelineItem.topic, index, "startTime", startTime.toDate().toISOString()));
    }
    return (
        <TimelineItem>
            <TimelineOppositeContent display="none" />
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ textAlign: "center" }}>
                {editMode ?
                    <Paper sx={{ width: width, padding: "10px", position: "relative" }} elevation={3}>
                        <Button variant="outlined" startIcon={<CloseIcon />}
                            sx={{ backgroundColor: "white", height: "25px", margin: "10px" }}
                            onClick={() => { deleteItem(timelineItem.topic, index) }}>
                            Delete Item
                        </Button>
                        <TextField
                            required
                            id="outlined-required"
                            label="Required Title"
                            defaultValue={timelineItem.title}
                            onBlur={handleChangeTitle}
                            sx={{ margin: "10px" }}
                        />
                        <TextField
                            id="standard-multiline-static"
                            label="Content"
                            multiline
                            defaultValue={timelineItem.content}
                            onChange={handleChangeContent}
                            variant="filled"
                            sx={{ margin: "10px", width: "90%" }}
                        />

                        <Box sx={{ padding: "10px" }}>
                            <Box display="flex" justifyContent="space-between" >
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setIsEditStartTime(!isEditStartTime);
                                        setIsEditEndTime(false);
                                        if (!startTime) {
                                            handleChangeStartTime(dayjs(timelineItem.startTime))
                                        }
                                        if (!endTime) {
                                            handleChangeEndTime(dayjs(timelineItem.endTime))
                                        }
                                    }}>
                                    {startTime ? startTime.format('DD/MM/YYYY') : null}
                                </Button>
                                <EastIcon />
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setIsEditEndTime(!isEditEndTime);
                                        setIsEditStartTime(false);
                                        if (!startTime) {
                                            handleChangeStartTime(dayjs(timelineItem.startTime))
                                        }
                                        else
                                            handleChangeEndTime(dayjs(timelineItem.endTime))
                                    }
                                    }>
                                    {endTime ? endTime.format('DD/MM/YYYY') : null}
                                </Button>
                            </Box>
                            {isEditStartTime || isEditEndTime ?
                                <Box>
                                    {isEditStartTime && <Typography>StartTime</Typography>}
                                    {isEditEndTime && <Typography>EndTime</Typography>}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label={isEditStartTime ? "Start Time" : "End Time"}
                                            value={isEditStartTime ? startTime : endTime}
                                            onChange={(newValue) => {
                                                if (isEditStartTime) {
                                                    handleChangeStartTime(newValue)
                                                } else {
                                                    handleChangeEndTime(newValue)
                                                }
                                            }}
                                            renderInput={(params) => <TextField required {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box> : null}
                        </Box>
                    </Paper>

                    :

                    <Paper sx={{ width: width, padding: "10px" }} elevation={3}>
                        <Typography
                            sx={{ fontWeight: 'bold', textTransform: 'uppercase', wordBreak: "break-word" }}>
                            {timelineItem.title}
                        </Typography>
                        <Typography sx={{ wordBreak: "break-word" }}>{timelineItem.content}</Typography>
                        <Box sx={{ padding: "10px" }}>
                            <Box display="flex" justifyContent="space-between" >
                                <Paper elevation={0} variant="outlined" sx={{ borderWidth: "5px", padding: "3px" }}>
                                    {startTime.format('DD/MM/YYYY')}
                                </Paper>
                                <EastIcon />
                                <Paper elevation={0} variant="outlined" sx={{ borderWidth: "5px", padding: "3px" }}>
                                    {endTime.format('DD/MM/YYYY')}
                                </Paper>
                            </Box>
                        </Box>
                    </Paper>}
            </TimelineContent>
        </TimelineItem >
    );
}
