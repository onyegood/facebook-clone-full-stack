import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Return, Search } from '../../../svg';
import useClickOutside from '../../../helpers/useClickOutside';
import './style.css';
import { DEFAULT_ICON_COLOR } from '../../../constants/colors';

type SearchMenuParams = {
  setShowSearchMenu: Dispatch<SetStateAction<boolean>>;
};
const SearchMenu: React.FC<SearchMenuParams> = ({ setShowSearchMenu }) => {
  const [iconVisible, setIconVisible] = useState<boolean>(true);
  const menu = useRef<any>(null);
  const input = useRef<any>(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => setShowSearchMenu(false)}
          >
            <Return color={DEFAULT_ICON_COLOR} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={DEFAULT_ICON_COLOR} />
            </div>
          )}

          <input
            ref={input}
            type="text"
            placeholder="Search facebook"
            className="hide_input"
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        {/* eslint-disable-next-line */}
        <a>Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="search_results scrollbar"></div>
    </div>
  );
};

export default SearchMenu;
