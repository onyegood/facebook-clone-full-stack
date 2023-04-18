import { DEFAULT_ICON_COLOR } from '../../../../constants/colors';
import { ArrowRight, Plus } from '../../../../svg';
import { UserStory } from '../../../../types/story';
import StoryItem from './StoryItem';
import './style.css';

type StoriesComponentProps = {
  stories: UserStory[];
};

const StoriesComponent: React.FC<StoriesComponentProps> = ({ stories }) => {
  return (
    <div className="stories">
      <div className="create_story_card">
        <img src="../../../images/default_pic.png" alt="" />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.map((story, i) => (
        <StoryItem {...story} key={i + 1} />
      ))}
      <div className="white_arrow">
        <ArrowRight color={DEFAULT_ICON_COLOR} />
      </div>
    </div>
  );
};

export default StoriesComponent;
