import GlobalHeader from '../../components/header';
import LeftSideBar from '../../components/home/left';
import RightSidebar from '../../components/home/right';
import { useTypedSelector } from '../../hooks/useSelectorHook';

const HomePage = () => {
  const { user } = useTypedSelector((state) => state.users);
  return (
    <div className="home">
      <GlobalHeader user={user} />
      <LeftSideBar user={user} />
      <RightSidebar user={user} />
    </div>
  );
};

export default HomePage;
