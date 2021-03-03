import logo from '../images/logo.svg';

function Header(props) {


  function onHeaderLinkClick() {
    props.onHeaderLinkClick(props.link);
  }

  return(
    <header className="header">
        <img src={logo} alt="Логотип" className="header__logo"/>
        <div className="header__wrapper">
        <p className="header__user-info">{props.userEmail}</p>
        <button className="header__link" type="button" onClick={onHeaderLinkClick}>{props.linkText}</button>
        </div>
      </header>
  )
}

export default Header;