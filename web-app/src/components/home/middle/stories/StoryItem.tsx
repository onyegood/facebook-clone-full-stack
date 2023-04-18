import { UserStory } from '../../../../types/story';
import './style.css';

const StoryItem: React.FC<UserStory> = ({
  image,
  profile_name,
  profile_picture,
}) => {
  return (
    <div className="story">
      <img src={image} alt="" className="story_img" />
      <div className="story_profile_pic">
        <img src={profile_picture} alt="" />
      </div>
      <div className="story_profile_name">{profile_name}</div>
    </div>
  );
};

export default StoryItem;
