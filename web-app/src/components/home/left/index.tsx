import React from 'react';
import './style.css';
import { UserInfoType } from '../../../types/user';
import LeftLink from './LeftLink';

type LeftSideBarProps = {
  user: UserInfoType;
};

const LeftSideBar: React.FC<LeftSideBarProps> = ({ user }) => {
  return (
    <div className="left_sidebar">
      <div className="left_link">
        <img src={user?.image} alt={user?.first_name} height={100} />
        <span>
          {user?.first_name}
          {user?.last_name}
        </span>
      </div>
      <LeftLink img={user.image} text="Hekk" notification={undefined} />
    </div>
  );
};

export default LeftSideBar;
