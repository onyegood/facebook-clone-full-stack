import { Link } from 'react-router-dom';

type LeftLinkProps = {
  img: string;
  notification?: string;
  text: string;
};
const LeftLink: React.FC<LeftLinkProps> = ({ img, notification, text }) => {
  return (
    <Link to="/" className="left_link hover1">
      <img src={`../../../left/${img}.png`} alt={`icon`} />
      {notification !== undefined ? (
        <div className="col">
          <div className="col_1">{text}</div>
          <div className="col_2">{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </Link>
  );
};

export default LeftLink;
