import Auth from './Auth.js';

function Login(props) {
  
  function handleSubmit(password, email) {
    props.handleLogin(password, email)
  }

  return (
    <Auth 
      title="Вход"
      buttonText="Войти"
      onSubmit={handleSubmit}
    />
  )
}

export default Login;