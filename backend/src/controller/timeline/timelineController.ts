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
        return res.status(200).send("timeline created");
    });
}

const timelineRetri = (req: any, res: any) => {
  const email = req.params.email;
  if (email) {
    TimelineModel.find({email: email}, null, {sort: {'startTime': 1}}, function(err: any, timelines: any) {
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
      sortedTimelines.topics = topics;
      return res.status(200).json(sortedTimelines);
    })
  } else {
      return res.status(500).end('uesr email is missing');
  }
}
module.exports = { timelineCreate, timelineRetri };
