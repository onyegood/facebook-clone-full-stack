import { DEFAULT_ICON_COLOR } from '../../../../constants/colors';
import { useGetMediaQuery } from '../../../../hooks/useGetMediaQuery';
import { ArrowRight, Plus } from '../../../../svg';
import { UserStory } from '../../../../types/story';
import StoryItem from './StoryItem';
import './style.css';

type StoriesComponentProps = {
  stories: UserStory[];
};

const StoriesComponent: React.FC<StoriesComponentProps> = ({ stories }) => {
  const media1175px = useGetMediaQuery('1175px');
  const media1030px = useGetMediaQuery('1030px');
  const media960px = useGetMediaQuery('960px');
  const media885px = useGetMediaQuery('885px');

  const max = (): number => {
    if (media885px) {
      return 5;
    }
    if (media960px) {
      return 4;
    }
    if (media1175px) {
      return 4;
    }
    if (media1030px) {
      return 5;
    }
    return stories.length;
  };

  return (
    <div className="stories">
      <div className="create_story_card">
        <img src="../../../images/default_pic.png" alt="" />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.slice(0, max()).map((story, i) => (
        <StoryItem {...story} key={i + 1} />
      ))}
      <div className="white_arrow">
        <ArrowRight color={DEFAULT_ICON_COLOR} />
      </div>
    </div>
  );
};

export default StoriesComponent;
