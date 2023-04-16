import React from 'react';

type ShortcutItemProps = {
  name: string;
  link: string;
  img: string;
};
const ShortcutItem: React.FC<ShortcutItemProps> = ({ name, link, img }) => {
  return (
    <a href={link} rel="noreferrer" className="shortcut_item">
      <img src={img} alt="" />
      <span>{name}</span>
    </a>
  );
};

export default ShortcutItem;
