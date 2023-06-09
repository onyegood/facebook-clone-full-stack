import { Link } from 'react-router-dom';
import './style.css';
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from '../../svg';

import SearchMenu from './search-menu';
import React, { useRef, useState } from 'react';
import MegaMenu from './mega-menu';
import useClickOutside from '../../helpers/useClickOutside';
import UserMenu from './user-menu';
import { UserInfoType } from '../../types/user';
import { DEFAULT_ICON_COLOR } from '../../constants/colors';

type GlobalHeaderProps = {
  user: UserInfoType;
};
const GlobalHeader: React.FC<GlobalHeaderProps> = ({ user }) => {
  const [showSearchMenu, setShowSearchMenu] = useState<boolean>(false);
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [showUserMenu, setUserMegaMenu] = useState<boolean>(false);

  const _megaMenu = useRef<any>(null);
  const _userMenu = useRef<any>(null);
  useClickOutside(_megaMenu, () => {
    setShowMegaMenu(false);
  });
  useClickOutside(_userMenu, () => {
    setUserMegaMenu(false);
  });

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={DEFAULT_ICON_COLOR} />
          <input
            type="text"
            placeholder="Search facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && <SearchMenu setShowSearchMenu={setShowSearchMenu} />}
      <div className="header_middle">
        <Link to="/" className="middle_icon hover1 active">
          <HomeActive />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Friends color={DEFAULT_ICON_COLOR} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={DEFAULT_ICON_COLOR} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={DEFAULT_ICON_COLOR} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={DEFAULT_ICON_COLOR} />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">
          <img src={user?.image} alt={user?.first_name} />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showMegaMenu && 'active_header'}`}
          ref={_megaMenu}
        >
          <div onClick={() => setShowMegaMenu((prev) => !prev)}>
            <div style={{ transform: 'translateY(2px)' }}>
              <Menu />
            </div>
          </div>
          {showMegaMenu && <MegaMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">8+</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && 'active_header'}`}
          ref={_userMenu}
        >
          <div onClick={() => setUserMegaMenu((prev) => !prev)}>
            <div style={{ transform: 'translateY(2px)' }}>
              <ArrowDown color={DEFAULT_ICON_COLOR} />
            </div>
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
