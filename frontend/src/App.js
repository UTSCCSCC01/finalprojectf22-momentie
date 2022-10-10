import { Route, Routes } from 'react-router-dom'
import Login from '../src/components/pages/Login/Login.jsx'
import Profile from '../src/components/pages/Profile/Profile.jsx'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
