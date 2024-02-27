const ethers = require("ethers");
import React, { useState, useEffect } from "react";
import styles from "./mainPage.module.css";
import walletManagerInstance from "../../src/WalletManager";
require("dotenv").config();

const sepoliaAPI = process.env.SEPOLIA_API_KEY;

export default function UnlockPage({ navigateToPage }) {
  const [firstLetter, setFirstLetter] = useState("S");
  const [accountName, setAccountName] = useState("Account1");
  const [address, setAddress] = useState("0x123456789abcdef");
  const [balance, setBalance] = useState();
  const [tokenName, setTokenName] = useState("SepoliaETH");

  const provider = new ethers.InfuraProvider("sepolia", sepoliaAPI);
  const activeWallet = walletManagerInstance.GetActiveWallet();
  console.log("mainPage activeWallet: ", activeWallet.address);

  const handleAddressButton = async () => {
    try {
      await navigator.clipboard.writeText(address);
      console.log("已复制到剪切板中");
    } catch (err) {
      console.error("无法复制到剪切板中", err);
    }
  };

  useEffect(() => {
    if (!activeWallet) {
      console.error("Active wallet not found.");
      return;
    }
    console.log("provider: ", provider);
    provider
      .getBalance(activeWallet.address)
      .then((walletBalance) => {
        console.log("walletBalance", walletBalance);
        // 将余额转换为以太坊单位（wei）并格式化显示
        const formattedBalance = parseFloat(
          ethers.formatUnits(walletBalance)
        ).toFixed(2);
        setBalance(formattedBalance);
        setAddress(activeWallet.address);
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
      });
  }, []);

  // 选择网络
  const handleSelectNetWork = () => {};

  // 锁定钱包
  const handleLogOutButton = () => {
    console.log("switch to index");
    navigateToPage("loginPage");
  };
  return (
    <>
      <div className={styles.container}>
        {/* 头部 */}
        <div className={styles.div_header}>
          <div className={styles.div_headerContent}>
            <div className={styles.div_select_network}>
              <button
                className={styles.button_network}
                onClick={handleSelectNetWork}
              >
                <div className={styles.network_wrapper}>
                  <div className={styles.div_firstLetter}>{firstLetter}</div>
                </div>
              </button>
            </div>
            <button className={styles.button_account}>
              {accountName} <div className={styles.div_account_arrowDown}></div>
            </button>
            <button
              className={styles.button_logOut}
              onClick={handleLogOutButton}
            ></button>
          </div>
        </div>

        {/* 内容 */}
        <div className={styles.div_content}>
          <div className={styles.div_address}>
            <button
              className={styles.button_address}
              onClick={handleAddressButton}
            >
              {address}
            </button>
          </div>
          <div className={styles.div_balance}>
            <span className={styles.span_balance}>{balance}</span>{" "}
            <span className={styles.span_TokenName}>{tokenName}</span>
          </div>
          <div className={styles.div_buttons}>
            <button className={styles.button_class}>
              <div className={styles.div_buttonClass}></div>
              <p className={styles.p_description}>汇率</p>
            </button>
            <button className={styles.button_class}>
              <div className={styles.div_buttonClass}></div>
              <p className={styles.p_description}>转账</p>
            </button>
            <button className={styles.button_class}>
              <div className={styles.div_buttonClass}></div>
              <p className={styles.p_description}>兑换</p>
            </button>
            <button className={styles.button_class}>
              <div className={styles.div_buttonClass}></div>
              <p className={styles.p_description}>私钥</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
