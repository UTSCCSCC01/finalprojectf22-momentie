import { Route, Routes } from 'react-router-dom'
import Login from '../src/components/pages/Login/Login.jsx'
function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" />
      <Route path="/signup" />
      <Route path="/profile" />
    </Routes>
  );
}

export default App;
