import TimelineModel from '../../model/timelineModel'

const timelineCreate = (req: any, res: any) => {
    //validation
    if (req.body.email === "" || req.body.email === undefined) {
        return res.status(401).send("Email missing");
    }
    if (req.body.topic === "" || req.body.topic === undefined) {
        return res.status(401).send("topic is required");
    }
    if (req.body.title === "" || req.body.title === undefined) {
        return res.status(401).send("title is required");
    }
    if (req.body.content === "" || req.body.content === undefined) {
        return res.status(401).send("content is required");
    }
    if (req.body.startTime === "" || req.body.startTime === undefined) {
        return res.status(401).send("startTime is required");
    }
    if (req.body.endTime === "" || req.body.endTime === undefined) {
        return res.status(401).send("endTime is required");
    }
    
    const newTimeline = new TimelineModel({
        email: req.body.email,
        topic: req.body.topic,
        title: req.body.title,
        content: req.body.content,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        //image not implemented yet
    });

    TimelineModel.create(newTimeline, (err: any) => {
        if (err) {
            console.log(err);
            return res.status(409).send(err);
        }
        console.log(newTimeline);
    });
    return res.status(200).send("timeline created");
}

module.exports = { timelineCreate }