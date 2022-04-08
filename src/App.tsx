import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './configs/firebase/firebaseConfig';
import Login from './components/login';
import SignUp from './components/SignUp';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFoundPage';
import NavBar from './components/navbar';
import {
  setName,
  removeName,
  setEmail,
  removeEmail,
  setEmailVerified,
  removeEmailVerified,
  setUid,
  removeUid,
} from './slices/slices';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setName(user.displayName));
        dispatch(setEmail(user.email));
        dispatch(setUid(user.uid));
        dispatch(setEmailVerified(user.emailVerified));
      } else {
        dispatch(removeName());
        dispatch(removeEmail());
        dispatch(removeUid());
        dispatch(removeEmailVerified());
      }
    });
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
};
export default App;
