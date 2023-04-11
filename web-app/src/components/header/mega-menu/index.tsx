import React from 'react';
import './style.css';
import { megaMenu, create } from '../../../data';
import MegaMenuItem from './MegaMenuItem';

type MegaMenuParams = {};

const MegaMenu: React.FC<MegaMenuParams> = () => {
  return (
    <div className="mega_menu">
      <div className="mega_menu_header">Menu</div>
      <div className="mega_menu_wrap scrollbar">
        <div className="mega_left">
          <div className="mega_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" className="" />
          </div>
          {megaMenu.map((item) => (
            <div className="mega_menu_group" key={item.name}>
              <div className="mega_menu_group_header">{item.name}</div>
              {item.categories.map((cat) => (
                <MegaMenuItem {...cat} key={cat.name} />
              ))}
            </div>
          ))}
        </div>
        <div className="mega_right">
          <div className="mega_right_header">Create</div>
          {create.map((item) => (
            <div className="mega_right_item hover1" key={item.name}>
              <div className="mega_right_circle">
                <i className={item.icon}></i>
              </div>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
