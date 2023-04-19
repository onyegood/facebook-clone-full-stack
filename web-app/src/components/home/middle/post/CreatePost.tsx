import { LiveVideo, Photo } from '../../../../svg';
import { UserInfoType } from '../../../../types/user';
import './style.css';

type CreatePostProps = {
  user: UserInfoType;
};

const CreatePost: React.FC<CreatePostProps> = ({ user }) => {
  return (
    <div className="create_post">
      <div className="create_post_header">
        <img src={user?.image} alt={user?.first_name} />
        <div className="open_post hover2">
          What is on your mind, {user?.first_name}?
        </div>
      </div>
      <div className="create_post_splitter"></div>
      <div className="create_post_body">
        <div className="create_post_icon hover1">
          <LiveVideo color="#f3425f" />
          Live video
        </div>
        <div className="create_post_icon hover1">
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="create_post_icon hover1">
          <LiveVideo color="#f7b920" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
