import React, { useState } from 'react';
import './style.css';
import { UserInfoType } from '../../../types/user';
import LeftLink from './LeftLink';
import { left } from '../../../data/home';
import { Link } from 'react-router-dom';
import { ArrowDown1 } from '../../../svg';
import ShortcutItem from './ShortcutItem';

type LeftSideBarProps = {
  user: UserInfoType;
};

const LeftSideBar: React.FC<LeftSideBarProps> = ({ user }) => {
  const [showAll, setShowAll] = useState(false);
  const START_FROM = showAll ? 8 : 0;
  const STOP_AT = showAll ? left.length : 8;

  return (
    <div className="left_sidebar scrollbar">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.image} alt={user?.first_name} />
        <span>
          {user?.first_name}
          {user?.last_name}
        </span>
      </Link>
      {left.slice(START_FROM, STOP_AT).map((link, i) => (
        <LeftLink key={i + 1} {...link} />
      ))}
      <div className="left_link hover1" onClick={() => setShowAll(!showAll)}>
        <div className={`small_circle ${showAll && 'rotate360'}`}>
          <ArrowDown1 />
        </div>
        <span>See {showAll ? 'less' : 'more'}</span>
      </div>
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <ShortcutItem
          name="My youtube channel"
          link="http://localhost.com/youtube"
          img="../../images/ytb.png"
        />
        <ShortcutItem
          name="My instagram"
          link="http://localhost.com/youtube"
          img="../../images/insta.png"
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
