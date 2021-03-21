import {useState} from 'react';

function Auth(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(password, email);
    setPassword('');
    setEmail('');
  }

  return (
    <section className="auth">
      <h1 className="auth__title">{props.title}</h1>
      <form className="auth__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input className="auth__input"
          placeholder="Email"
          type="text"
          minLength="2"
          value={email}
          onChange={handleEmail}
          required
          name="email"
          autoComplete="off"
          type="email"
        />

        <input className="auth__input"
          placeholder="Пароль"
          type="password"
          minLength="2"
          value={password}
          onChange={handlePassword}
          required
          name="password"
          autoComplete="off"
        />

        <button className="auth__submit-button" type="submit">{props.buttonText}</button>
      </form>
      {props.children}
    </section>
  )

}

export default Auth;