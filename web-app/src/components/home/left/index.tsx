import React from 'react';
import './style.css';
import { UserInfoType } from '../../../types/user';
import LeftLink from './LeftLink';
import { left } from '../../../data/home';
import { Link } from 'react-router-dom';

type LeftSideBarProps = {
  user: UserInfoType;
};

const LeftSideBar: React.FC<LeftSideBarProps> = ({ user }) => {
  return (
    <div className="left_sidebar">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.image} alt={user?.first_name} />
        <span>
          {user?.first_name}
          {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink key={i + 1} {...link} />
      ))}
    </div>
  );
};

export default LeftSideBar;
