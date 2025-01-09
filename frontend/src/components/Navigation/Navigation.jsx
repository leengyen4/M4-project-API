import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <ul className="nav-left">
        <li>
          <NavLink id='logo' to="/"><img src="/logo2.png" alt="LodgingLux" /></NavLink>
        </li>
      </ul>
      <ul className="nav-right">
        {isLoaded && (
          <>
            {sessionUser && (
              <li>
                <NavLink to="/spots/new" className="new-spot-button">Create a New Spot</NavLink>
              </li>
            )}
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
