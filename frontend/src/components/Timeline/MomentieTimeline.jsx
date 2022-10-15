import Box from '@mui/material/Box';
import { Typography, Paper } from '@mui/material';
import { Timeline } from '@mui/lab';
import { useState } from 'react';
import MomentieTimelineItem from './MomentieTimelineItem';

export default function MomentieTimeline(props) {
    const [activeStep, setActiveStep] = useState(0);
    const { contentList, isVertical, width, edit } = props;

    return (
        <Box sx={{ maxWidth: width }}>
            {
                Object.keys(contentList).map((id) => (
                    <Box sx={{ maxWidth: width / contentList.length }} key={id}>
                        <Typography
                            sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                            fontSize={width / contentList.length / 12}  >
                            {id}
                        </Typography>
                        {contentList[id].map((timelineItem, index) => (
                            <Timeline key={index}>
                                <MomentieTimelineItem timelineItem={timelineItem} />
                            </Timeline>
                        ))}
                    </Box>
                ))
            }
        </Box>
    );
}