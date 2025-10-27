import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';
import useMoviesByGenre from '@/hooks/useMoviesByGenre';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  // Check if the session does not exists
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
   props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  
  // Get movies by genre
  const { data: actionMovies = [] } = useMoviesByGenre('Action');
  const { data: comedyMovies = [] } = useMoviesByGenre('Comedy');
  const { data: sciFiMovies = [] } = useMoviesByGenre('Sci-Fi');
  const { data: adventureMovies = [] } = useMoviesByGenre('Adventure');
  const { data: thrillerMovies = [] } = useMoviesByGenre('Thriller');
  const { data: dramaMovies = [] } = useMoviesByGenre('Drama');
  const { data: documentaryMovies = [] } = useMoviesByGenre('Documentary');
  const { data: romanceMovies = [] } = useMoviesByGenre('Romance');

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies}/>
        {actionMovies.length > 0 && <MovieList title="Action & Adventure" data={actionMovies}/>}
        {thrillerMovies.length > 0 && <MovieList title="Thrillers" data={thrillerMovies}/>}
        {comedyMovies.length > 0 && <MovieList title="Comedies" data={comedyMovies}/>}
        {sciFiMovies.length > 0 && <MovieList title="Sci-Fi" data={sciFiMovies}/>}
        {dramaMovies.length > 0 && <MovieList title="Dramas" data={dramaMovies}/>}
        {documentaryMovies.length > 0 && <MovieList title="Documentaries" data={documentaryMovies}/>}
        {romanceMovies.length > 0 && <MovieList title="Romance" data={romanceMovies}/>}
        {adventureMovies.length > 0 && <MovieList title="Adventures" data={adventureMovies}/>}
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
  )
}
