import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import { requests } from '../api/tmdb';
const Home = () => {
  return (
    <div className="bg-bg-primary min-h-screen">
      <Hero />
      {}
      <div className="-mt-24 md:-mt-32 relative z-20 pt-4">
        <MovieRow title="🔥 Trending Now"        fetchUrl={requests.fetchTrending} />
        <MovieRow title="⭐ Top Rated"            fetchUrl={requests.fetchTopRated} />
        <MovieRow title="💥 Action Thrillers"     fetchUrl={requests.fetchActionMovies} />
        <MovieRow title="😂 Comedies"             fetchUrl={requests.fetchComedyMovies} />
        <MovieRow title="👻 Horror"               fetchUrl={requests.fetchHorrorMovies} />
        <MovieRow title="💕 Romance"              fetchUrl={requests.fetchRomanceMovies} />
        <MovieRow title="🎬 Documentaries"        fetchUrl={requests.fetchDocumentaries} />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
