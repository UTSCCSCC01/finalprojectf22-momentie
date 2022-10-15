import { TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector, TimelineDot, TimelineOppositeContent } from '@mui/lab'
import { Typography, Paper, Button, Box } from '@mui/material';
import { useState } from 'react';
import Calendar from 'react-calendar';

export default function MomentieTimelineItem(props) {
    const { timelineItem } = props
    const [isEditStartTime, setIsEditStartTime] = useState(false);
    const [isEditEndTime, setIsEditEndTime] = useState(false);
    return (
        <TimelineItem>
            <TimelineOppositeContent display="none" />
            <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent >
                <Paper >
                    <Typography
                        sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {timelineItem.title}
                    </Typography>
                    <Typography>{timelineItem.content}</Typography>
                    <Box justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={() => { setIsEditStartTime(!isEditStartTime); setIsEditEndTime(false) }}>
                            {new Date(timelineItem.startTime).toDateString()}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => { setIsEditEndTime(!isEditEndTime); setIsEditStartTime(false) }}>
                            {new Date(timelineItem.endTime).toDateString()}
                        </Button>
                        {isEditStartTime || isEditEndTime ?
                            <Box>
                                {isEditStartTime && <Typography>StartTime</Typography>}
                                {isEditEndTime && <Typography>EndTime</Typography>}
                                <Calendar />
                            </Box> : null}
                    </Box>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    );
}