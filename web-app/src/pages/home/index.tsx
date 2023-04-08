import { useRef, useState } from 'react';
import GlobalHeader from '../../components/header';
import useClickOutside from '../../helpers/useClickOutside';

const HomePage = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const el = useRef<any>(null);

  useClickOutside(el, () => {
    setVisible(false);
  });

  return (
    <div>
      <GlobalHeader />
      {visible && <div className="card" ref={el}></div>}
    </div>
  );
};

export default HomePage;
