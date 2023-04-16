import React from 'react';
type ContactItemProps = {
  first_name: string;
  last_name: string;
  image: string;
};
const ContactItem: React.FC<ContactItemProps> = ({
  first_name,
  last_name,
  image,
}) => {
  return (
    <div className="contact hover3">
      <div className="contact_img">
        <img src={image} alt={first_name} />
      </div>
      <span>
        {first_name} {last_name}
      </span>
    </div>
  );
};

export default ContactItem;
