import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Loading from './components/common/Loading';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AuthContext from './store/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.uid);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const PrivateRoute = ({ children }) => {
    if (authCtx.isLoggedIn) {
      return <Navigate to='/' replace />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Loading />} />
        <Route
          path='/login'
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <PrivateRoute>
              <Signup />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
