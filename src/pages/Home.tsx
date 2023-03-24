import { AuthRedirectWrapper } from 'components';
import { dAppName } from 'config';
import { routeNames } from '../routes';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='container'>
      <h2 className='my-5 text-center' data-testid='title'>
        {dAppName}
      </h2>
      <Link to={routeNames.unlock} className="text-dark text-center text-decoration-none"><h5>Connect with your wallet!</h5></Link>
    </div>
  );
};

export const Home = () => (
  <AuthRedirectWrapper>
    <HomePage />
  </AuthRedirectWrapper>
);
