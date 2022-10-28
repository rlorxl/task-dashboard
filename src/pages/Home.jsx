import { useEffect, useState } from 'react';

import { Card } from '../styled/style';

import Header from '../components/UI/Header';
import Intro from '../components/intro/Intro';
import Calendar from '../components/calendar/Calendar';
import Task from '../components/task/Task';
import TaskModal from '../components/UI/TaskModal';

import { auth } from '../firebase';

const Home = () => {
  const user = auth.currentUser;
  const [showModal, setShowModal] = useState(false);

  const modalHandler = {
    show() {
      setShowModal(true);
    },
    close() {
      setShowModal(false);
    },
  };

  useEffect(() => {
    console.log(user);
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     const uid = user.uid;
    //     console.log(uid);
    //   } else {
    //     // User is signed out
    //     console.log('sign out');
    //   }
    // });
  }, []);

  return (
    <>
      {showModal && <TaskModal {...modalHandler} />}
      <Header />
      <Card>
        <Intro />
        <Calendar />
        <Task {...modalHandler} />
      </Card>
    </>
  );
};

export default Home;
