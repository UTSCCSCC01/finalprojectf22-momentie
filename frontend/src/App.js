import { Route, Routes } from 'react-router-dom'
import { useRef } from 'react';
import Login from '../src/components/pages/Login/Login.jsx'
import Profile from '../src/components/pages/Profile/Profile.jsx'
import SignUp from './components/pages/SignUp/SignUp.jsx';
import MomentiePost from './components/post/MomentiePost.jsx';
import MomentieTimeline from './components/Timeline/MomentieTimeline.jsx';
// import Rate from './components/Rating/Rate.jsx';

import MomentieTag from './components/Tag/MomentieTag.jsx';
import Home from './components/pages/Home/Home.jsx';
const TagData = [{ title: "apple" }, { title: "banana" }]
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
  // const editableDataRef = useRef(timelineData);
  // const editTagData = useRef(TagData);
  // function printData() {
  //   console.log(editableDataRef);
  // }
  const postList = [{content: "johiwuehrfiau hewiruhwqiaeurhqw ieurh iqwuerh iqwuehriquwhe riuhqweiruh qiweurh qiuwerh iuqwhe rgiuwhretoi tuhwer iouuthweoiruthl kj", email: "okok"},{content: "shabic01", email: "nihao"}];
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/timeline" element={<MomentieTimeline contentRef={editableDataRef} width="300px" editMode={false} allowTopicEdit={false} printData={printData} />} /> */}
      {/* <Route path="/tag" element={<MomentieTag contentRef={editTagData} width={100} height={30} edit={false} />} /> */}
      {/* <Route path="/rate" element={<Rate />} /> */}
      <Route path="/post"  element={<MomentiePost postList={postList}/>} />
    </Routes>
  );
}

export default App;
