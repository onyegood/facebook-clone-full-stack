type LeftLinkProps = {
  img: string;
  notification: string | undefined;
  text: string;
};
const LeftLink: React.FC<LeftLinkProps> = ({ img, notification, text }) => {
  return (
    <div className="left_link">
      <img src={`../../../left/${img}.png`} alt={`icon`} />
      {notification !== undefined ? (
        <div className="col">
          <div className="col_1">{text}</div>
          <div className="col_2">{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default LeftLink;
