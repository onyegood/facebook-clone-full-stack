import React from 'react';

type AllMenuParams = {};

const AllMenu: React.FC<AllMenuParams> = () => {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" className="" />
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Social</div>
            <div className="all_menu_item hover1">
              <img src="../../left/campus.png" alt="campus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
