import { TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector, TimelineDot, TimelineOppositeContent } from '@mui/lab'
import { Typography, Paper, Button, Box, TextField, Checkbox, FormControlLabel } from '@mui/material';
import dayjs from 'dayjs'
import { useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { countries, employementTypes } from './helperData'

export default function MomentieTimelineItem(props) {
    const { index, timelineItem, width, editMode, deleteItem, editItem, isSkill } = props
    function parseTimelineContent(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return { content: str, companyName: "Unknown Company", employmentType: "", location: "", isCurrent: false }
        }
    }
    const [contentJson, setContentJson] = useState(parseTimelineContent(timelineItem.content));
    const [startTime, setStartTime] = useState(dayjs(timelineItem.startTime));
    const [endTime, setEndTime] = useState(dayjs(timelineItem.endTime));
    const [isEditStartTime, setIsEditStartTime] = useState(false);
    const [isEditEndTime, setIsEditEndTime] = useState(false);

    useEffect(() => {
        setStartTime(dayjs(timelineItem.startTime));
        setEndTime(dayjs(timelineItem.endTime));
    }, [timelineItem])
    const handleChangeTitle = (event) => {
        editItem(timelineItem.topic, index, "title", event.target.value);
    };
    const handleChangeContent = (value, namespace) => {
        contentJson[namespace] = value;
        console.log(value)
        editItem(timelineItem.topic, index, "content", JSON.stringify(contentJson));
    };
    const handleChangeEndTime = (value) => {
        if (!value || !value.isValid()) {
            value = endTime;
        }
        setEndTime(value, editItem(timelineItem.topic, index, "endTime", value.toDate().toISOString()));
    }
    const handleChangeStartTime = (value) => {
        if (!value || !value.isValid()) {
            value = startTime;
        }
        setStartTime(value, editItem(timelineItem.topic, index, "startTime", value.toDate().toISOString()));
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
                    <Paper sx={{
                        width: width,
                        padding: "10px",
                        position: "relative",
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column"
                    }}
                        elevation={3}>
                        <Button variant="outlined" startIcon={<CloseIcon />}
                            sx={{
                                borderRadius: "6%",
                                backgroundColor: "#BEACAC",
                                color: '#F5F5F5',
                                borderColor: "#BEACAC",
                                height: "25px",
                                margin: "10px 0px 10px 0px"
                            }}
                            onClick={() => { deleteItem(timelineItem.topic, index) }}>
                            Delete Item
                        </Button>
                        {isSkill ? null :
                            <Box sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                flexDirection: "column"
                            }}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required Title"
                                    defaultValue={timelineItem.title}
                                    onBlur={handleChangeTitle}
                                    sx={{ margin: "10px 0px 0px 0px", backgroundColor: "#D9D9D9" }}
                                />
                                <TextField
                                    id="outlined"
                                    label="Company/Institution"
                                    sx={{ margin: "10px 0px 0px 0px", backgroundColor: "#D9D9D9" }}
                                    defaultValue={contentJson.companyName}
                                    onBlur={(e) => { handleChangeContent(e.target.value, "companyName") }}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={employementTypes}
                                    value={contentJson.employmentType}
                                    onChange={(_, v) => { handleChangeContent(v, "employmentType") }}
                                    sx={{ width: 300, margin: "10px 0px 0px 0px" }}
                                    renderInput={(params) => <TextField {...params} label="Employment Type" />}
                                />
                                <Autocomplete
                                    sx={{ width: 300, margin: "10px 0px 0px 0px" }}
                                    options={countries}
                                    autoHighlight
                                    getOptionLabel={(option) => option.label}
                                    onChange={(_, v) => { handleChangeContent(v ? v : "", "location") }}
                                    value={contentJson.location ? contentJson.location : null}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                            <img
                                                loading="lazy"
                                                width="20"
                                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                alt=""
                                            />
                                            {option.label} ({option.code}) +{option.phone}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Choose a country"
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                />
                                <FormControlLabel control={
                                    <Checkbox defaultChecked={contentJson.isChecked} onChange={(e) => {
                                        handleChangeContent(e.target.checked, "isChecked")
                                    }} sx={{
                                        color: "#BEACAC",
                                        '&.Mui-checked': {
                                            color: "#BEACAC",
                                        },
                                    }}
                                    />}
                                    label="Currently Occupied Here?" />

                            </Box>}
                        <TextField
                            id="standard-multiline-static"
                            label="Content"
                            multiline
                            defaultValue={contentJson.content}
                            onChange={(e) => { handleChangeContent(e.target.value, "content") }}
                            variant="filled"
                            sx={{
                                margin: "0px 0px 10px 0px",
                                width: "90%",
                                borderRadius: "6%",
                                backgroundColor: "#D9D9D9",
                                color: '#F5F5F5',
                                borderColor: "#BEACAC"
                            }}
                        />

                        <Box sx={{ color: 'secondary.main', backgroundColor: "#D9D9D9" }}>
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
                                    {startTime ? startTime.format('MM/DD/YYYY') : null}
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
                                    {endTime ? endTime.format('MM/DD/YYYY') : null}
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

                    <Paper sx={{
                        width: width, padding: "10px", backgroundColor: "#D9D9D9", color: '#897a7a',
                    }} elevation={3}>
                        {isSkill ? null : <div>
                            <Typography
                                sx={{ fontSize: 'h6.fontSize', fontWeight: 'bold', textTransform: 'uppercase', wordBreak: "break-word", textAlign: "left" }}>
                                {timelineItem.title}
                            </Typography>
                            <Typography sx={{ wordBreak: "break-word", textAlign: "left", fontWeight: 'bold' }}>{contentJson.employmentType ?
                                contentJson.companyName + " • " + contentJson.employmentType
                                : contentJson.companyName + " • " + "Unknown Employment"}</Typography>
                            <Typography sx={{ wordBreak: "break-word", textAlign: "left" }}>{contentJson.location ? contentJson.location.label : "Unknown Location"}</Typography>

                        </div>
                        }

                        <Typography sx={{ wordBreak: "break-word", textAlign: "left" }}>{contentJson.content}</Typography>
                        <Box sx={{ padding: "10px 0px 10px 0px" }}>
                            <Box display="flex" alignItems="flex-start" >
                                <Paper elevation={0}
                                    variant="outlined"
                                    sx={{
                                        borderWidth: "5px",
                                        padding: "3px",
                                        borderRadius: "6%",
                                        borderColor: "#BEACAC",
                                        backgroundColor: '#F5F5F5',
                                        color: '#897a7a',
                                        margin: "10px 0px 10px 0px"
                                    }}
                                >
                                    {startTime.format('DD/MM/YYYY')}
                                </Paper>
                                <EastIcon sx={{ margin: "10px 10px 10px 10px" }} />
                                <Paper elevation={0}
                                    variant="outlined"
                                    sx={{
                                        borderWidth: "5px",
                                        borderRadius: "6%",
                                        borderColor: "#BEACAC",
                                        backgroundColor: '#F5F5F5',
                                        color: '#897a7a',
                                        padding: "3px",
                                        margin: "10px 0px 10px 0px"
                                    }}
                                >
                                    {contentJson.isChecked ? "Present" : endTime.format('DD/MM/YYYY')}
                                </Paper>
                            </Box>
                        </Box>
                    </Paper>}
            </TimelineContent>
        </TimelineItem >
    );
}
