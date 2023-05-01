import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserInfoType } from '../../../types/user';
import './style.css';
import { userMenuList } from '../../../data';
import PrivacyPolicy from './PrivacyPolicy';
import HelpSupport from './HelpSupport';
import DisplayAccessibility from './DisplayAccessibility';
import { useLogout } from '../../../hooks/useLogout';

type UserMenuProps = {
  user: UserInfoType;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [visible, setVisible] = useState<number>(0);
  const { logout } = useLogout();

  return (
    <div className="mmenu">
      {visible === 0 && (
        <Fragment>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.image} alt={user?.first_name} height={200} />
            <div className="mmenu_col">
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_main hover3">
            <div className="small_circle">
              <i className="report_filled_icon" />
            </div>
            <div className="mmenu_col">
              <div className="mmenu_span1">Give feedback</div>
              <div className="mmenu_span2">Help us improve facebook</div>
            </div>
          </div>
          <div className="mmenu_splitter"></div>
          {userMenuList.map((item) => (
            <div
              className="mmenu_item hover3"
              key={item.id}
              onClick={() =>
                item.name === 'Logout' ? logout() : setVisible(item.id)
              }
            >
              <div className="small_circle">
                <i className={item.icon} />
              </div>
              <span>{item.name}</span>
              {item.right_arrow && (
                <div className="rArrow">
                  <i className="right_icon" />
                </div>
              )}
            </div>
          ))}
        </Fragment>
      )}
      {visible === 1 && <PrivacyPolicy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
};

export default UserMenu;
