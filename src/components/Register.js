import Auth from './Auth.js';
import {NavLink} from 'react-router-dom';

function Register(props) {

  function handleSubmit(password, email) {
    props.handleRegister(password, email); 
  }

  return(
    <Auth
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
    >
      <NavLink className="auth__signin-tip" activeClassName="auth__signin-tip_active" to="/sign-in">Уже зарегистрированы? Войти</NavLink>
    </Auth>
  )
}

export default Register;