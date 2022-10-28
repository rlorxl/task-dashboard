import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
