import { Link } from "react-router-dom";

function Header(props) {
  const {
    isConnected,
    handleAddressClick,
    displayWalletAddress,
    connectWallet,
    disconnectWallet,
  } = props;
  return (
    <div className="header">
      <a href="" className="logo">
        <img src="./images/profile.png" alt="" />
        <h1>PORI</h1>
      </a>
      <nav className="nav">
        <li></li>
        <li>
          <a href="https://paint-pi.vercel.app/" target="_blank">
            paint
          </a>
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
