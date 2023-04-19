import { UserInfoType } from '../../../../types/user';
import '../style.css';

type CreatePostProps = {
  user: UserInfoType;
};

const CreatePost: React.FC<CreatePostProps> = ({ user }) => {
  return (
    <div className="create_post">
      <div className="create_post_header">
        <img src={user?.image} alt={user?.first_name} />
        <div className="open_post">
          What is on your mind, {user?.first_name}?
        </div>
      </div>
      <div className="create_post_splitter"></div>
    </div>
  );
};

export default CreatePost;
