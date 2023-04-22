import { useMediaQuery } from 'react-responsive';

export const useGetMediaQuery = (width: string) => {
  return useMediaQuery({
    query: `(max-width: ${width})`,
  });
};
