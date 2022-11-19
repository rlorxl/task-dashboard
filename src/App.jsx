import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Loading from './components/common/Loading';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './components/common/NotFound';

import { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AuthContext from './store/auth-context';
import { auth } from './firebase';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const PrivateRoute = ({ children }) => {
    if (!authCtx.isLoggedIn) {
      return <Navigate to='/login' replace />;
    } else if (isLoggedIn) {
      return children;
    }

    return <Loading />;
  };

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/login'
          element={authCtx.isLoggedIn ? <Navigate to='/error' /> : <Login />}
        />
        <Route
          path='/signup'
          element={authCtx.isLoggedIn ? <Navigate to='/error' /> : <Signup />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
