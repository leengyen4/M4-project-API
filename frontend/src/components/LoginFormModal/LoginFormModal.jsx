  import { useEffect, useState, useRef } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const modalRef = useRef();

  useEffect(() => {
    const errors = {};

    if (credential.length < 4) {
      errors.login = 'Credential must be more than 4 characters';
    } else if (password.length < 6) {
      errors.password = 'Password must be more than 6 characters';
    }

    setErrors(errors);
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = (credential, password) => {
    dispatch(sessionActions.login({credential, password}))
    closeModal()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="modal-container">
      <main className="login-form-modal" ref={modalRef}>
        <h1>Log In</h1>
        {errors.credential && <p>{errors.credential}</p>}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button id='login-button' disabled={Object.values(errors).length} type="submit">Log In</button>
        </form>
          <button className='demo-login' onClick={() => handleDemoLogin('demo', 'password')}>Demo User</button>
      </main>
    </div>
  );
}

export default LoginFormModal;
