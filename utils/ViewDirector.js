import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const {
    user,
    userLoading,
  } = useAuth();

  // if user state is null, then show loader

  if (userLoading) {
    return <Loading />;
  }
  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <div className="master-div">
          <NavBar />
          <div className="component-render-div">
            <div className="container"><Component {...pageProps} /></div>
          </div>
        </div>
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
