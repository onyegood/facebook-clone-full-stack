import { RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLDivElement> | undefined,
  fun: Function
) => {
  useEffect(() => {
    const listener = (e: Event) => {
      if (!ref?.current || ref?.current?.contains(e.target as Node)) {
        return;
      }

      fun();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, fun]);
};

export default useClickOutside;
