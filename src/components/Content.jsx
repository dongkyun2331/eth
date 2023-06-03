import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

function Content(props) {
  const { isConnected, currentBalance, walletAddress } = props;
  const [inputValue, setInputValue] = useState("");
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const displayCurrentBalance = `${currentBalance?.toFixed(6)}`;

  const labelStyle = {
    position: "absolute",
    top: "110px",
    left: inputValue.length > 0 ? `${65 + inputValue.length * 12}px` : "65px",
    fontWeight: "400",
    fontSize: "16px",
  };

  const handleMaxClick = () => {
    setInputValue(displayCurrentBalance);
  };

  const handleCloseClick = () => {
    setIsDepositOpen(false);
    setIsWithdrawOpen(false);
    setInputValue(false);
  };

  const handleDepositClick = () => {
    if (isConnected) {
      setIsDepositOpen(true);
    }
  };

  const handleWithdrawClick = () => {
    if (isConnected) {
      setIsWithdrawOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    await web3.eth.sendTransaction({
      from: account,
      to: e.target.withdrawAddress.value,
      value: web3.utils.toWei(e.target.withdrawAmount.value, "ether"),
    });
    handleCloseClick();
  };

  return (
    <div className="content">
      <section className="section">
        <div className="mint">
          <h3>ETHEREUM</h3>
        </div>
        <div className="lavender">
          <h3>MY BALANCE</h3>
          <div className="balance">
            {isConnected ? (
              <span>{displayCurrentBalance}</span>
            ) : (
              <span>0.000000</span>
            )}
            <p>ETH</p>
          </div>
          <div className="balance-btns">
            <button className="deposit" onClick={handleDepositClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.3 6.7L8.5 2.9V15H7.5V2.9L3.7 6.7L3 6L8 1L13 6L12.3 6.7Z"
                  fill="#fff"
                ></path>
              </svg>
              DEPOSIT
            </button>
            <button className="withdraw" onClick={handleWithdrawClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}>
                <path
                  d="M13.2929 9.79295L11 12.0859V6C11 4.93913 10.5786 3.92172 9.82843 3.17157C9.07828 2.42143 8.06087 2 7 2C5.93913 2 4.92172 2.42143 4.17157 3.17157C3.42143 3.92172 3 4.93913 3 6V14H4V6C4 5.20435 4.31607 4.44129 4.87868 3.87868C5.44129 3.31607 6.20435 3 7 3C7.79565 3 8.55871 3.31607 9.12132 3.87868C9.68393 4.44129 10 5.20435 10 6V12.0859L7.70705 9.79295L7 10.5L10.5 14L14 10.5L13.2929 9.79295Z"
                  fill="#222"
                ></path>
              </svg>
              WITHDRAW
            </button>
          </div>
        </div>
      </section>
      {(isDepositOpen || isWithdrawOpen) && (
        <div>
          <div className="dimm" onClick={handleCloseClick}></div>
          {isDepositOpen && (
            <div className="depositpage">
              <article className="modal-title">Deposit</article>
              <strong>Deposit Address</strong>
              <div className="wallet-address">
                <div className="address">
                  <span className="three">{walletAddress.slice(0, 3)}</span>
                  <span>{walletAddress.slice(3, -3)}</span>
                  <span className="three">{walletAddress.slice(-3)}</span>
                </div>
                <CopyToClipboard text={walletAddress} onCopy={handleCopyClick}>
                  <button className="copy-button">
                    {isCopied ? "Copy completed" : "Copy"}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          )}
          {isWithdrawOpen && (
            <form className="withdrawpage" onSubmit={handleSubmit}>
              <article className="modal-title">Withdraw</article>
              <strong>Withdraw amount</strong>
              <input
                type="number"
                id="withdrawAmount"
                placeholder="0"
                step="0.000001"
                value={inputValue}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="withdrawAddress"
                placeholder="withdraw address"
              />
              <span style={labelStyle}>ETH</span>
              <article className="max">
                BALANCE ETH
                <button>
                  <span className="max_number">{displayCurrentBalance}</span>
                  <span className="max_text" onClick={handleMaxClick}>
                    MAX
                  </span>
                </button>
              </article>
              <input type="submit" className="submit" value="withdraw" />
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Content;
