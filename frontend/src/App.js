import { Route, Routes } from 'react-router-dom'
import Login from '../src/components/pages/Login/Login.jsx'
import Profile from '../src/components/pages/Profile/Profile.jsx'
import SignUp from './components/pages/SignUp/SignUp.jsx';
import MomentieTimeline from './components/Timeline/MomentieTimeline.jsx';

const timelineData = {
  "experience": [{
    id: "experience",
    title: "first",
    content: "something",
    startTime: "2022-10-05T04:38:26.022Z",
    endTime: "2022-10-05T04:38:26.022Z",
  },
  {
    id: "experience",
    title: "first",
    content: "something",
    startTime: "2022-10-05T04:38:26.022Z",
    endTime: "2022-10-05T04:38:26.022Z",
  }]
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/timeline" element={<MomentieTimeline contentList={timelineData} width={400} isVertical={true} />} />
    </Routes>
  );
}

export default App;
