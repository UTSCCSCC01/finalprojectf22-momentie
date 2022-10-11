import { Route, Routes } from 'react-router-dom'
import Login from '../src/components/pages/Login/Login.jsx'
import Profile from '../src/components/pages/Profile/Profile.jsx'
import SignUp from './components/pages/SignUp/SignUp.jsx';
function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
