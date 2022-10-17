import { Route, Routes } from 'react-router-dom'
import { useRef } from 'react';
import Login from '../src/components/pages/Login/Login.jsx'
import Profile from '../src/components/pages/Profile/Profile.jsx'
import SignUp from './components/pages/SignUp/SignUp.jsx';
import MomentieTimeline from './components/Timeline/MomentieTimeline.jsx';
const timelineData = {
  "experience": [{
    id: "experience",
    title: "first",
    content: "somethingasasdddddddddddddddddddddddddddddddddddddddddddd",
    startTime: "2022-10-05T04:38:26.022Z",
    endTime: "2022-10-05T04:38:26.022Z",
  },
  {
    id: "experience",
    title: "second",
    content: "something",
    startTime: "2022-10-05T04:38:26.022Z",
    endTime: "2022-10-05T04:38:26.022Z",
  }, {
    id: "experience",
    title: "first",
    content: "something",
    startTime: "2022-10-05T04:38:26.022Z",
    endTime: "2022-10-05T04:38:26.022Z",
  }, {
    id: "experience",
    title: "first",
    content: "something",
    startTime: "2022-10-05T04:38:26.022Z",
    endTime: "2022-10-05T04:38:26.022Z",
  }],
  "skill": [{
    id: "skill",
    title: "first",
    content: "somethingas",
    startTime: "2022-10-05T04:38:26.022Z",
    endTime: "2022-10-05T04:38:26.022Z",
  },]
}
for (const property in timelineData) {
  for (var i = 0; i < timelineData[property].length; i++) {
    timelineData[property][i]._id = i;
  }
}
function App() {
  /*
  const editableDataRef = useRef(timelineData); // does not cause re-render when changed.
  const backupData = useState(timelineData); // re-renders when changed.
  
  We assume the most outer level using this component wrapps it in a form. Otherwise alerts
  are not going to be valid here.
  1. Use http request to get backpData and use it to set editableDataRef.
  2. Pass editableDataRef using  into Timeline
  3. In the component, synchronize the reference with information inside the component
  Following are for Profile edit page only
  4. When we want to edit, pass editMode as true.
  5. When user clicks cancel, reset dataRef with backupData and pass editMode as false.
  6. When user clicks Done, send data in editableDataRef to server and reset backupData to re-render.
     If request failed, do step 4.`
  
  
  */
  const editableDataRef = useRef(timelineData);
  function printData() {
    console.log(editableDataRef);
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/timeline" element={<MomentieTimeline contentRef={editableDataRef} width="300px" editMode={true} allowTopicEdit={true} printData={printData} />} />
    </Routes>
  );
}

export default App;
