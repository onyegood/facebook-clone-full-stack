import React from 'react';
import './style.css';
import { Dots, NewRoom, Search } from '../../../svg';
import ContactItem from './ContactItem';
import { UserInfoType } from '../../../types/user';
import { DEFAULT_ICON_COLOR } from '../../../constants/colors';

type RightSidebarProps = {
  user: UserInfoType;
};

const RightSidebar: React.FC<RightSidebarProps> = ({ user }) => {
  return (
    <div className="right_sidebar">
      <div className="heading">Sponsored</div>
      <div className="splitter1" />
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Contacts</div>
          <div className="contacts_header_right">
            <div className="contacts_circle hover1">
              <NewRoom color={DEFAULT_ICON_COLOR} />
            </div>
            <div className="contacts_circle hover1">
              <Search color={DEFAULT_ICON_COLOR} />
            </div>
            <div className="contacts_circle hover1">
              <Dots color={DEFAULT_ICON_COLOR} />
            </div>
          </div>
        </div>
        <div className="contact_list">
          <ContactItem {...user} />
          <ContactItem {...user} />
          <ContactItem {...user} />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
