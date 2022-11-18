import { Route, Routes } from 'react-router-dom'
import Login from '../src/components/pages/Login/Login.jsx'
import Profile from '../src/components/pages/Profile/Profile.jsx'
import SignUp from './components/pages/SignUp/SignUp.jsx';
import Home from './components/pages/Home/Home.jsx';
import MomentieUserList from './components/UserList/MomentieUserList.jsx';
function App() {

  const userList = [{ email: "lsp@gmail.com", username: "dead", like: 5 },
  { email: "Chris1@gmail.com", username: "I", like: 5 },
  { email: "Chris2@gmail.com", username: "I", like: 5 },
  { email: "Chris3@gmail.com", username: "I", like: 5 },
  { email: "Chris4@gmail.com", username: "I", like: 5 },
  { email: "Chris5@gmail.com", username: "I", like: 5 },
  { email: "Chris6@gmail.com", username: "I", like: 5 },];
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route path="/profile/:email" element={<Profile />} />
      <Route path="/userList" element={<MomentieUserList userList={userList} cardPerPage={6} />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
