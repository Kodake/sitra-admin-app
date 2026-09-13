
const Logo = (props: { logo: string }) => {
  return (
    <>
      {/* NAV BAR */}
      <nav className="login-nav">
        <div className="login-container">
          <div className="login-logo">{props.logo}</div>
        </div>
      </nav>
    </>
  );
};

export default Logo;
