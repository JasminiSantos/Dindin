import logo from '../assets/logo.svg';

function Header(){
    return (
      <header className="container-header">
        <img src={logo} className="logo" alt="logo"/>
        <span className="header-title">Dindin</span>
      </header>
    );
}

export default Header;
