import { IUrlResponse } from 'models/Url';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';

export interface UseShortUrlReturn {
  urls: IUrlResponse[];
  isLoading: boolean;
}

export const useShortUrl = (
  initialData: UseShortUrlReturn['urls']
): UseShortUrlReturn => {
  const [session] = useSession();
  const { data } = useSWR<IUrlResponse[]>(session ? '/api/shortUrl' : null, {
    initialData,
  });

  return {
    urls: data,
    isLoading: !data,
  };
};
