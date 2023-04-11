import React from 'react';

type MegaMenuItemProps = {
  icon: string;
  name: string;
  description: string;
};
const MegaMenuItem: React.FC<MegaMenuItemProps> = ({
  icon,
  name,
  description,
}) => {
  return (
    <div className="mega_menu_item hover1">
      <img src={`../../left/${icon}.png`} alt="campus" />
      <div className="mega_menu_col">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
};
export default MegaMenuItem;
