import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppBar from 'components/AppBar';
import Spinner from 'components/Spinner';
import Container from 'components/Container';
import UpButton from 'components/UpButton';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() =>
  import('pages/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import('pages/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const MovieDetailsPage = lazy(() =>
  import('pages/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */),
);

function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Spinner />}>
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/movies" component={MoviesPage} />
            <Route path="/movies/:movieId" component={MovieDetailsPage} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </Suspense>
      <UpButton />
      <ToastContainer />
    </>
  );
}

export default App;
