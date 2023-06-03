import { Link } from "react-router-dom";

export function Header(props) {
  const {
    isConnected,
    handleAddressClick,
    displayWalletAddress,
    connectWallet,
    disconnectWallet,
  } = props;
  return (
    <div className="header">
      <Link to={"/"}>
        <a href="#" className="logo">
          <img src="./images/profile.png" alt="" />
          <h1>PORI</h1>
        </a>
      </Link>
      <nav className="nav">
        <li>
          <Link to={"/write"}>
            <a href="#">Write</a>
          </Link>
        </li>
        <li>
          <Link to={"/community"}>
            <a href="#">Community</a>
          </Link>
        </li>
        <li>
          {isConnected ? (
            <span className="buttonContainer" onClick={handleAddressClick}>
              {displayWalletAddress} DISCONNECT
            </span>
          ) : (
            <button className="connect_wallet " onClick={() => connectWallet()}>
              CONNECT WALLET
            </button>
          )}
        </li>
      </nav>
      <div className="disconnect-modal">
        <div className="disconnect-content">
          <h2>Disconnect Wallet</h2>
          <span>Are you sure you want to logout</span>
        </div>
        <div className="disconnect-btns">
          <button className="disconnect-cancel" onClick={handleAddressClick}>
            CANCEL
          </button>
          <button className="disconnect-button" onClick={disconnectWallet}>
            DISCONNECT
          </button>
        </div>
      </div>
      <div className="disconnect-dimm" onClick={handleAddressClick}></div>
    </div>
  );
}

export default Header;
