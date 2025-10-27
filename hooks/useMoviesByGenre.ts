import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useMoviesByGenre = (genre: string) => {
  const { data, error, isLoading } = useSWR(
    genre ? `/api/movies/genre/${genre}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useMoviesByGenre;
