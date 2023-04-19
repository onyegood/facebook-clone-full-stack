import './style.css';
import GlobalHeader from '../../components/header';
import LeftSideBar from '../../components/home/left';
import StoriesComponent from '../../components/home/middle/stories';
import RightSidebar from '../../components/home/right';
import { useTypedSelector } from '../../hooks/useSelectorHook';
import { stories } from '../../data/home';
import CreatePost from '../../components/home/middle/post/CreatePost';

const HomePage = () => {
  const { user } = useTypedSelector((state) => state.users);
  return (
    <div className="home">
      <GlobalHeader user={user} />
      <LeftSideBar user={user} />
      <div className="home_middle">
        <StoriesComponent stories={stories} />
        <CreatePost user={user} />
      </div>
      <RightSidebar user={user} />
    </div>
  );
};

export default HomePage;
