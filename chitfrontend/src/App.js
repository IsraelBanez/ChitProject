import './App.css';
import {Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CheckEmail from './pages/CheckEmail';
import ResetPassword from './pages/ResetPassword';
import NoPage from './pages/NoPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="check-email" element={<CheckEmail />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="*" element={<NoPage/>}/>
    </Routes>
  </>

  );
}

export default App;
