import './App.css';
import {Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import ForgotPassword from './pages/forgot_password/ForgotPassword';
import CheckEmail from './pages/check_email/CheckEmail';
import ResetPassword from './pages/reset_password/ResetPassword';
import BookLog from './pages/booklog/BookLog';
import TransactionHistory from './pages/transaction_history/TransactionHistory';
import Network from './pages/network/Network';
import Messages from './pages/messages/Messages';
import Notifications from './pages/notifications/Notifications';
import Search from './pages/search/Search';
import NoPage from './pages/nopage/NoPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="forgot-password/check-email" element={<CheckEmail />} />
      <Route path="forgot-password/reset-password" element={<ResetPassword />} />

      <Route path="book-log" element={<BookLog />} />
      <Route path="transaction-history" element={<TransactionHistory />} />
      <Route path="network" element={<Network />} />
      <Route path="messages" element={<Messages />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="search" element={<Search />} />
      <Route path="*" element={<NoPage/>}/>
    </Routes>
  </>

  );
}

export default App;
