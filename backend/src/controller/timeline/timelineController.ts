import TimelineModel from '../../model/timelineModel'
import UserModel from '../../model/userModel';

const timelineCreate = (req: any, res: any) => {
    //validation
    if (req.user === undefined) {
        return res.status(401).end("User is not authorized");
    }

    const email = req.user.email;
    if (email === "" || email === undefined) {
        return res.status(400).send("Email missing");
    }
    if (req.body.topic === "" || req.body.topic === undefined) {
        return res.status(400).send("topic is required");
    }
    if (req.body.title === "" || req.body.title === undefined) {
        return res.status(400).send("title is required");
    }
    if (req.body.content === "" || req.body.content === undefined) {
        return res.status(400).send("content is required");
    }
    if (req.body.startTime === "" || req.body.startTime === undefined) {
        return res.status(400).send("startTime is required");
    }
    if (req.body.endTime === "" || req.body.endTime === undefined) {
        return res.status(400).send("endTime is required");
    }

    //make sure the begin time is smaller than the end date
    if (new Date(req.body.startTime).getTime() > new Date(req.body.endTime).getTime()) {
        return res.status(422).send("invalid time period: startTime should not be later than endTime");
    }

    UserModel.findOne({ email: email }, function (err: any, user: any) {
        if (err) return res.status(500).end(err);

        const newTimeline = new TimelineModel({
            email: req.params.email,
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
            return res.status(200).send("timeline created");
        });
    })
}

const timelineRetri = (req: any, res: any) => {
    const email = req.params.email;
    if (email) {
        TimelineModel.find({ email: email }, null, { sort: { 'startTime': 1 } }, function (err: any, timelines: any) {
            if (err) return res.status(500).end(err);
            console.log(timelines)
            const topics: any[] = [];
            const sortedTimelines = timelines.reduce((userTimeline: any, timeline: any) => {
                const topic = timeline.topic;
                if (!(topics.includes(topic))) {
                    topics.push(topic);
                    userTimeline[topic] = [];
                }
                userTimeline[topic].push(timeline);
                return userTimeline
            }, {});
            return res.status(200).json(sortedTimelines);
        })
    } else {
        return res.status(500).end('uesr email is missing');
    }
}

const timelineEdit = (req: any, res: any) => {
    if (req.user === undefined) {
        return res.status(401).end("User is not authorized");
    }
    const email = req.user.email;
    const timelineList = req.body.timelineList;
    if (timelineList === undefined) {
        return res.status(500).end('list is missing');
    }
    if (email) {
        //delete previous timeline data of this user
        TimelineModel.deleteMany({ email: email }, (err: any) => {
            if (err) return res.status(500).send(err);
            console.log("previous timeline deleted successfully");
            //validation
            const tlMap = timelineList.map((obj: any) => ({ ...obj, email: email }));
            for(let i of tlMap.values()){
                console.log(i);
                if (i.topic === "" || i.topic === undefined) {
                    return res.status(400).send("topic is required");
                }
                if (i.title === "" || i.title === undefined) {
                    return res.status(400).send("title is required");
                }
                if (i.content === "" || i.content === undefined) {
                    return res.status(400).send("content is required");
                }
                if (i.startTime === "" || i.startTime === undefined) {
                    return res.status(400).send("startTime is required");
                }
                if (i.endTime === "" || i.endTime === undefined) {
                    return res.status(400).send("endTime is required");
                }
                //make sure the begin time is smaller than the end date
                if (new Date(i.startTime).getTime() > new Date(i.endTime).getTime()) {
                    return res.status(400).send("invalid time period: startTime should not be later than endTime");
                }
            }
            //update new information
            TimelineModel.insertMany(timelineList.map((obj: any) => ({ ...obj, email: email })),
                (err: any, timelines: any) => {
                    console.log(err);
                    if (err) return res.status(500).send(err);

                    return res.status(200).send("timeline edit successfully");
                })
        });
    } else {
        return res.status(500).end('uesr email is missing');
    }
}

module.exports = { timelineCreate, timelineRetri, timelineEdit };
