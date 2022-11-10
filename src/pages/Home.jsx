import { Card } from '../styled/style';
import Header from '../components/UI/Header';
import Intro from '../components/intro/Intro';
import Calendar from '../components/calendar/Calendar';
import Task from '../components/task/Task';

const Home = () => {
  return (
    <>
      <Header />
      <Card>
        <Intro />
        <Calendar />
        <Task />
      </Card>
    </>
  );
};

export default Home;
