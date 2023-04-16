import React from 'react';
import './style.css';
import { Dots, NewRoom, Search } from '../../../svg';

const RightSidebar = () => {
  const color = '#65676b';
  return (
    <div className="right_sidebar">
      <div className="heading">Sponsored</div>
      <div className="splitter1" />
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Contacts</div>
          <div className="contacts_header_right">
            <div className="contacts_circle">
              <NewRoom color={color} />
            </div>
            <div className="contacts_circle">
              <Search color={color} />
            </div>
            <div className="contacts_circle">
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className="contact_list"></div>
      </div>
    </div>
  );
};

export default RightSidebar;
