import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent click from bubbling up to document
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const handleManage = (e) => {
    e.preventDefault();
    navigate('/spots/manage');
  };

  const ulClassName = `profile-dropdown ${showMenu ? '' : 'hidden'}`;

  return (
    <div className="profile-container">
      <button id='menu-button' onClick={toggleMenu}>
        <RxHamburgerMenu size={25} /> <FaUserCircle size={25} />
      </button>
      <ul id='menu-list' className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='menu-list'>
            <li>Hello, {user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <button className='manage-spots' onClick={handleManage}>Manage Spots</button>
            <button className='logout' onClick={logout}>Log Out</button>
          </div>
        ) : (
          <>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
                className='login-button'
              />


              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
                className='signup-button'
              />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
