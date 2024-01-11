import {Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NoPage from './pages/NoPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="*" element={<NoPage/>}/>
    </Routes>
  </>

  );
}

export default App;
