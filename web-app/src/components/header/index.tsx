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

import { useTypedSelector } from '../../hooks/useSelectorHook';
import SearchMenu from './SearchMenu';
import { useState } from 'react';
import AllMenu from './AllMenu';

const GlobalHeader = () => {
  const [showSearchMenu, setShowSearchMenu] = useState<boolean>(false);
  const { user } = useTypedSelector((state) => state.users);

  const color = '#65676b';
  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
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
          <Friends color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link to="/profile" className="profile_link hover1">
          <img src={user?.image} alt={user?.first_name} />
          <span>{user?.first_name}</span>
        </Link>
        <div className="circle_icon hover1">
          <Menu />
          <AllMenu />
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">8+</div>
        </div>
        <div className="circle_icon hover1">
          <ArrowDown color={color} />
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
